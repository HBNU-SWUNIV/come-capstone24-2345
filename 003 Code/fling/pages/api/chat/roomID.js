import { connectDB } from '../../../util/database';

const handleRoomID = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    const client = await connectDB;
    const db = await client.db('Fling');

    const doc = await db.collection('selected_groups').findOne({
      group: { $elemMatch: { email } },
    });

    if (doc) {
      const chatroomID = doc.chatroomID;
      res.status(200).send({ chatroomID });
    } else {
      res.status(500).send('해당 채팅방이 존재하지 않습니다');
    }
  }
};

export default handleRoomID;
