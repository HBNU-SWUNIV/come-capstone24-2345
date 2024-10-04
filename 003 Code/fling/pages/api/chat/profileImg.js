import { connectDB } from '../../../util/database';

const handleProfileImg = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    const client = await connectDB;
    const db = await client.db('Fling');

    if (email) {
      const result = await db.collection('user_cred').findOne({ email });

      if (result) {
        const profileImgUrl = result.profileImg;
        res.status(200).send(profileImgUrl);
      } else {
        res.status(500).send('잠시 후에 다시 시도해주세요');
      }
    } else {
      res.status(400).send('잠시 후에 다시 시도해주세요');
    }
  }
};

export default handleProfileImg;
