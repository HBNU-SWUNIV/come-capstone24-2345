import { connectDB } from './../../../util/database';

const handleEditMyIntro = async (req, res) => {
  if (req.method === 'POST') {
    let data = req.body;

    let modifyInfo = data.info;
    let defaultInfo = data.defaultInfo;

    console.log(data);

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
            introduction: modifyInfo.introduction,
          },
        }
      );
      res.status(200).send({ defaultInfo, modifyInfo });
    }
  }
};

export default handleEditMyIntro;
