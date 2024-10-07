import { connectDB } from '../../../util/database';

const handleReview = async (req, res) => {
  if (req.method === 'POST') {
    const { nickname, gender, review, score } = req.body;
    const client = await connectDB;
    const db = await client.db('Fling');

    try {
      const result = await db
        .collection('review')
        .updateOne(
          { nickname },
          { $setOnInsert: { nickname, gender, review, score } },
          { upsert: true }
        );
      res.status(200).end();
    } catch (err) {
      res.status(500).send('잠시 후에 다시 시도해주세요');
    }
  }
};

export default handleReview;
