import { connectDB } from '../../../util/database';

const handleDelteCredential = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    const client = await connectDB;
    const db = await client.db('Fling');

    await db.collection('user_cred').deleteOne({ email });
    res.status(200).end();
  }
};

export default handleDelteCredential;
