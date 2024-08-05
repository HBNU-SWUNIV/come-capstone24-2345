import { doc, getDoc } from '@firebase/firestore';
import firebaseStore from '@/firebase/firebaseStore';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const data = await getDoc(doc(firebaseStore, 'chat', 'chatting'));

    console.log(data.data());
  }
};

export default handler;
