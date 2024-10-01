import { connectDB } from '../../../util/database';

const handleRoomID = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    const client = await connectDB;
    const db = await client.db('Fling');

    const doc = await db.collection('selected_groups').findOne({
      group: { $elemMatch: { email } },
    });

    const chatroomID = doc.chatroomID;
    res.status(200).send({ chatroomID });
  }
};

export default handleRoomID;
