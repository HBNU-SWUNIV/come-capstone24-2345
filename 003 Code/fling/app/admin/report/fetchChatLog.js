import { db as firebaseDB } from '@/firebase/firebaseDB';
import { connectDB } from '@/util/database';
import { collection } from 'firebase/firestore';

const fetchChatLog = async (email) => {
  const client = await connectDB;
  const mongoDB = await client.db('Fling');

  const userDoc = await mongoDB
    .collection('user_cred')
    .findOne({ email: email });
  const chatroomID = userDoc.chatroomID;

  const messageRef = collection(firebaseDB, `chatroom/${chatroomID}/messages`);
};

export default fetchChatLog;
