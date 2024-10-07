import { connectDB } from '../../../util/database';

const handleReviewCheck = async (req, res) => {
  if (req.method === 'POST') {
    const { gender, nickname } = req.body;

    const client = await connectDB;
    const db = await client.db('Fling');

    try {
      const result = await db.collection('review').findOne({
        gender,
        nickname,
      });

      if (!result) {
        res.status(200).end();
      } else {
        res.status(400).send('이미 후기를 작성하셨습니다');
      }
    } catch (err) {
      res.status(500).end();
    }
  }
};

export default handleReviewCheck;
