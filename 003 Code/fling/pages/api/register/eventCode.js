import { connectDB } from '../../../util/database';

const handleEventCode = async (req, res) => {
  if (req.method === 'POST') {
    const code = req.body.code;

    const client = await connectDB;
    const db = await client.db('Fling');

    try {
      const groupDoc = await db.collection('selected_groups').findOne({
        group: {
          $elemMatch: {
            eventCode: code,
          },
        },
      });

      if (groupDoc) {
        const chatroomID = groupDoc.chatroomID;
        const user = groupDoc.group.filter(
          (item) => item.eventCode === code
        )[0];
        const isExistUser = await db.collection('user_cred').findOne({
          email: user.email,
        });

        if (isExistUser) {
          res.status(400).send('이미 가입이 되어있습니다');
        } else {
          res.status(200).send({ user, chatroomID });
        }
      } else {
        res.status(400).send('존재하지 않는 이벤트코드입니다');
      }
    } catch (error) {
      res.status(500).send('잠시 후 다시 시도해주세요');
    }
  }
};

export default handleEventCode;
