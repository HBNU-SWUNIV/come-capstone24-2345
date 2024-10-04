import { connectDB } from '../../../util/database';

const handleReport = async (req, res) => {
  if (req.method === 'POST') {
    const options = req.body.options;
    const etc = req.body.etc;
    const author = req.body.email;

    const client = await connectDB;
    const db = await client.db('Fling');

    if (options.length === 0 && etc === '') {
      res.status(400).send('옵션을 선택하시거나 기타란에 내용을 기입해주세요');
    } else {
      await db.collection('report').insertOne({
        options,
        etc,
        date: new Date(),
        author,
      });
      res.status(200).send('정상적으로 제출되었습니다');
    }
  }
};

export default handleReport;
