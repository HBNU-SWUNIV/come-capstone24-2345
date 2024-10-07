import { connectDB } from '../../../util/database';

const handleSetToken = async (req, res) => {
  if (req.method === 'POST') {
    const { email, token } = req.body;

    const client = await connectDB;
    const db = await client.db('Fling');

    try {
      const result = await db
        .collection('user_cred')
        .updateOne({ email }, { $set: { fcmToken: token } });

      console.log(result);
      res.status(200).end();
    } catch (err) {
      res.status(500).send('잠시 후에 다시 시도해주세요');
    }
  }
};

export default handleSetToken;
