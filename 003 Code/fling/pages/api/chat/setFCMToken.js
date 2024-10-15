import { connectDB } from '@/util/database';

const handleSetFCMToken = async (req, res) => {
  if (req.method === 'POST') {
    const { token, email } = req.body;

    const client = await connectDB;
    const db = await client.db('Fling');

    const userDoc = await db.collection('user_cred').findOne({ email });

    if (userDoc.token && userDoc.token === token) {
      res.status(200).end();
    } else {
      await db
        .collection('user_cred')
        .updateOne({ email }, { $set: { token } });
      res.status(200).end();
    }
  }
};

export default handleSetFCMToken;
