import { deleteObject, listAll, ref } from 'firebase/storage';
import { connectDB } from '../../../util/database';
import { storage } from '../../../firebase/firebaseDB';

const handleDeleteImages = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    const client = await connectDB;
    const db = await client.db('Fling');

    const userDoc = await db.collection('user_cred').findOne({ email });
    const chatroomID = userDoc.chatroomID;

    const chatImageListRef = ref(storage, `images/${chatroomID}`);

    try {
      const list = await listAll(chatImageListRef);

      list.items.forEach(async (item) => {
        await deleteObject(item);
      });

      res.status(200).end();
    } catch (err) {
      res
        .status(500)
        .send('리스트를 로드 및 삭제하는 중 오류가 발생했습니다: ' + err);
    }
  }
};

export default handleDeleteImages;
