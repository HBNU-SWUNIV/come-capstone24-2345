import { connectDB } from '@/util/database';

const CheckNickname = async (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    const client = await connectDB;
    const db = client.db('Fling');
    let result = await db
      .collection('user_cred')
      .find({
        nickname: data.nickname,
      })
      .toArray();

    if (result.length != 0) {
      res.status(400).send('이미 존재하는 닉네임입니다');
    }
    // 형식에 맞지 않는 닉네임이라면
    if (data.nickname == '') {
      res.status(400).send('올바르지 않은 닉네임입니다');
    } else {
      // 모든 조건에 부합한다면
      res.status(200).send(data);
    }
  }
};

export default CheckNickname;
