import { connectDB } from '../../../util/database';

const handleOtherInfo = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    const client = await connectDB;
    const db = await client.db('Fling');

    const doc = await db.collection('selected_groups').findOne({
      group: { $elemMatch: { email } },
    });

    if (doc) {
      const group = doc.group;

      const emailsArr = group.map((item) => item.email);
      const otherEmail = emailsArr.filter((item) => item !== email)[0];

      const otherUserDoc = await db
        .collection('user_cred')
        .findOne({ email: otherEmail });
      res.status(200).send({ nickname: otherUserDoc.nickname });
    } else {
      res.status(500).end();
    }
  }
};

export default handleOtherInfo;
