import { connectDB } from './../../../util/database';

const handleInquiry = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await connectDB;
    const db = await client.db('Fling');

    let title = data.inquiryTitle.trim();
    let content = data.inquiryContent.trim();

    if (title === '' || content === '') {
      res.status(400).send('제목 또는 문의 내용을 작성해주세요!');
    } else {
      let result = await db.collection('inquiry').insertOne({
        email: data.email,
        nickname: data.nickname,
        title,
        content,
        date: new Date(),
      });

      if (result.acknowledged) {
        res.status(200).end();
      } else {
        res.status(500).send('서버 측 오류');
      }
    }
  }
};

export default handleInquiry;
