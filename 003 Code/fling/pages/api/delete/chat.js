import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseDB';

const handleDeleteChat = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    const chatroomRef = collection(db, 'chatrooms');
    const q = query(chatroomRef, where('member', 'array-contains', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      res.status(200).send('이미 삭제되었습니다');
    } else {
      try {
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        res.status(200).end();
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
};

export default handleDeleteChat;
