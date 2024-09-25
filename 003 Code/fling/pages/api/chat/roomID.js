import { connectDB } from '../../../util/database';

const handleRoomID = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    const client = await connectDB;
    const db = await client.db('Fling');

    let result = await db.collection('user_cred').findOne({ email });
    res.status(200).send({ chatroomID: result.chatroomID });
  }
};

export default handleRoomID;
