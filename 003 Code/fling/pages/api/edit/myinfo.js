import { connectDB } from './../../../util/database';

const handleEditMyInfo = async (req, res) => {
  if (req.method === 'POST') {
    let data = req.body;

    let modifyInfo = data.info;
    let defaultInfo = data.defaultInfo;

    const client = await connectDB;
    const db = await client.db('Fling');

    if (
      defaultInfo.univ !== modifyInfo.univ ||
      defaultInfo.department !== modifyInfo.department
    ) {
      res.status(400).send('잘못된 접근입니다');
    } else {
      await db.collection('user_cred').updateOne(
        { email: defaultInfo.email },
        {
          $set: {
            height: modifyInfo.height,
            religion: modifyInfo.religion,
            mbti: modifyInfo.mbti,
            smoking: modifyInfo.smoking,
            drinkLimit: modifyInfo.drinkLimit,
            army: modifyInfo.army,
          },
        }
      );
      res.status(200).send({ defaultInfo, modifyInfo });
    }
  }
};

export default handleEditMyInfo;
