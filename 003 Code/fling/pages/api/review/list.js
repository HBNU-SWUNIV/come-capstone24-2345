import { connectDB } from '../../../util/database';

const handleReviewList = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectDB;
    const db = await client.db('Fling');

    try {
      const result = await db.collection('review').find({}).toArray();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).end();
    }
  }
};

export default handleReviewList;
