import { db } from '@/firebase/firebaseDB';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const handleConnect = async (req, res) => {
  if (req.method === 'POST') {
    const { isActive, email, chatroomID } = req.body;
    console.log(isActive, email, chatroomID);
    const now = new Date();

    const studentID = email.split('@')[0];

    const chatroomRef = doc(db, 'chatrooms', chatroomID);
    const docSnapshot = await getDoc(chatroomRef);
    if (!isActive) {
      // state false로 변경 하고 last를 now로 변경
      if (docSnapshot.exists()) {
        await updateDoc(chatroomRef, {
          [`active.${studentID}.last`]: new Date(),
          [`active.${studentID}.state`]: false,
        });
        res.status(200).end();
      }
    } else {
      // state true로 변경하고 last 그대로
      await updateDoc(chatroomRef, {
        [`active.${studentID}.state`]: true,
      });
      res.status(200).end();
    }
  }
};

export default handleConnect;
