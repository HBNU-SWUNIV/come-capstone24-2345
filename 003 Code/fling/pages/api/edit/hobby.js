import { connectDB } from '../../../util/database';

const handleEditHobby = async (req, res) => {
  if (req.method === 'POST') {
    const { info } = req.body;

    const client = await connectDB;
    const db = await client.db('Fling');

    await db.collection('user_cred').updateOne(
      { email: info.email },
      {
        $set: {
          hobby: info.hobby,
        },
      }
    );
    res.status(200).send({ hobby: info.hobby });
  }
};

export default handleEditHobby;
