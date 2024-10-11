import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db as firebaseDB } from '../../../firebase/firebaseDB';
import { connectDB } from '../../../util/database';

const handleDeleteChat = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    const client = await connectDB;
    const mongoDB = await client.db('Fling');

    const userCredDoc = await mongoDB
      .collection('user_cred')
      .findOne({ email });
    const chatroomID = userCredDoc.chatroomID;

    const messagesRef = collection(
      firebaseDB,
      'chatrooms',
      chatroomID,
      'messages'
    );

    const messagesQuerySnapShot = await getDocs(messagesRef);
    if (!messagesQuerySnapShot.empty) {
      messagesQuerySnapShot.forEach(async (messageDoc) => {
        const messageDocRef = doc(
          firebaseDB,
          'chatrooms',
          chatroomID,
          'messages',
          messageDoc.id
        );
        await deleteDoc(messageDocRef);
      });
    }

    const chatroomDoc = doc(firebaseDB, 'chatrooms', chatroomID);
    await deleteDoc(chatroomDoc);

    res.status(200).end();
  }
};

export default handleDeleteChat;
