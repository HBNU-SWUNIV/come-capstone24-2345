import { connectDB } from '../../../util/database';

const handleEditIntro = async (req, res) => {
  if (req.method === 'POST') {
    const { info } = req.body;

    const client = await connectDB;
    const db = await client.db('Fling');

    await db.collection('user_cred').updateOne(
      { email: info.email },
      {
        $set: {
          introduction: info.introduction,
        },
      }
    );
    res.status(200).send({ introduction: info.introduction });
  }
};

export default handleEditIntro;
