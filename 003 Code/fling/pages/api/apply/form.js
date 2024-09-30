import { connectDB } from '../../../util/database';

const handleForm = async (req, res) => {
  if (req.method === 'POST') {
    const { email, gender } = req.body;
    const client = await connectDB;
    const db = await client.db('Fling');

    const isExistUser = await db.collection('form').findOne({ email });

    const hanbatEmailPattern = /^\d{8}@edu\.hanbat\.ac\.kr$/;

    if (hanbatEmailPattern.test(email)) {
      if (isExistUser) {
        res.status(400).send('이미 신청되었습니다');
      } else {
        await db
          .collection('form')
          .insertOne({ email, gender, date: new Date() });
        res.status(200).end();
      }
    } else {
      res.status(400).send('이메일을 정확하게 입력해주세요');
    }
  }
};

export default handleForm;
