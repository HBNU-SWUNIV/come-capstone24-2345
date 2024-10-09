import { connectDB } from '../../../util/database';

const handleDeleteGroup = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    const client = await connectDB;
    const db = await client.db('Fling');

    try {
      await db
        .collection('selected_groups')
        .deleteOne({ group: { $elemMatch: { email } } });

      res.status(200).end();
    } catch (err) {
      res.status(200).send('이미 해당 그룹은 삭제되었습니다');
    }
  }
};

export default handleDeleteGroup;
