import { connectDB } from '../../../util/database';

const handleNickname = async (req, res) => {
  if (req.method === 'POST') {
    const nickname = req.body.nickname;

    const client = await connectDB;
    const db = await client.db('Fling');

    try {
      const result = await db.collection('user_cred').findOne({ nickname });
      if (!result) {
        res.status(200).end();
      } else {
        res.status(400).send('이미 존재하는 닉네임입니다');
      }
    } catch (error) {
      res.status(500).send('잠시 후에 다시 시도해주세요');
    }
  }
};

export default handleNickname;
