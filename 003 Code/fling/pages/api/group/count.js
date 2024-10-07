import { connectDB } from '../../../util/database';

const handleGroupCount = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectDB;
    const db = await client.db('Fling');

    try {
      const result = await db.collection('selected_groups').find({}).toArray();
      res.status(200).send(result.length);
    } catch (err) {
      res.status(500).send('잠시 후에 다시 시도해주세요');
    }
  }
};

export default handleGroupCount;
