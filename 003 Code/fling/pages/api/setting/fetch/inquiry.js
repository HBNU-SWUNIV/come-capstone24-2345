import { connectDB } from '@/util/database';

const fetchInquiry = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    const client = await connectDB;
    const db = await client.db('Fling');

    if (email) {
      const result = await db.collection('inquiry').find({ email }).toArray();
      res.status(200).send(result);
    } else {
      res.status(400).send('유저 정보를 불러오지 못했습니다');
    }
  }
};

export default fetchInquiry;
