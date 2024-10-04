import { connectDB } from '../../../util/database';

const handleProfileImg = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;
    const url = req.body.imgSrc;

    const client = await connectDB;
    const db = await client.db('Fling');

    if (email && url) {
      const result = await db
        .collection('user_cred')
        .updateOne({ email }, { $set: { profileImg: url } });

      if (result.acknowledged) {
        res.status(200).end();
      } else {
        res.status(500).send('잠시 후에 다시 시도해주세요');
      }
    } else {
      res.status(500).send('잠시 후에 다시 시도해주세요');
    }
  }
};

export default handleProfileImg;
