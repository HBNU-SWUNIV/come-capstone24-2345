import { connectDB } from '@/util/database';

const userInfoHandler = async (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    const client = await connectDB;
    const db = client.db('Fling');
    await db.collection('user_cred').insertOne(data);

    res.status(200).send('OK');
  }
};

export default userInfoHandler;
