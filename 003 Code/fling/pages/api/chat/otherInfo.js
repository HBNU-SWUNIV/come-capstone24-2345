import { connectDB } from '../../../util/database';

const handleOtherInfo = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    const client = await connectDB;
    const db = await client.db('Fling');

    let result;
    if (email) {
      result = await db.collection('user_cred').findOne({ email });
      if (result) {
        res.status(200).send({ nickname: result.nickname });
      } else {
        res.status(500).end();
      }
    }
  }
};

export default handleOtherInfo;
