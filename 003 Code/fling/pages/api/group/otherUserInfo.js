import { connectDB } from './../../../util/database';

const handleOtherUserInfo = async (req, res) => {
  if (req.method === 'POST') {
    const myEmail = req.body.email;

    const client = await connectDB;
    const db = await client.db('Fling');

    const doc = await db.collection('selected_groups').findOne({
      group: {
        $elemMatch: { email: myEmail },
      },
    });

    if (doc) {
      const otherUser = doc.group.filter((item) => item.email !== myEmail);
      const otherUserEmail = otherUser[0].email;
      const otherUserInfo = await db
        .collection('user_cred')
        .findOne({ email: otherUserEmail });

      const data = {
        gender: otherUserInfo.gender,
        birth: otherUserInfo.birth,
        univ: otherUserInfo.univ,
        univCert: otherUserInfo.univCert,
        department: otherUserInfo.department,
        nickname: otherUserInfo.nickname,
        mbti: otherUserInfo.mbti,
        height: otherUserInfo.height,
        drinkLimit: otherUserInfo.drinkLimit,
        smoking: otherUserInfo.smoking,
        army: otherUserInfo.army,
        hobby: otherUserInfo.hobby,
        datingType: otherUserInfo.datingType,
        introduction: otherUserInfo.introduction,
        religion: otherUserInfo.religion,
      };
      res.status(200).send(data);
    } else {
      res.status(400).send('해당 유저가 존재하지 않음');
    }
  }
};

export default handleOtherUserInfo;
