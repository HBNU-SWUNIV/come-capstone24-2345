import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

const ChangePassword = async (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;
    console.log(data);

    // 숫자, 특수기호를 최소 하나 이상
    // 8자 이상
    const pwPattern = new RegExp(
      '^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$'
    );

    const client = await connectDB;
    const db = client.db('Fling');

    if (data.findUserData.length == 0) {
      res.status(400).send('비정상적인 접근입니다');
    } else if (pwPattern.exec(data.password) == null) {
      res.status(400).send('비밀번호는 조건에 맞게 입력해주세요');
    } else if (data.password != data.reEnterPassword) {
      res.status(400).send('비밀번호가 맞는지 다시 확인해주세요');
    } else {
      const hashedPW = await bcrypt.hash(data.password, 10);
      await db
        .collection('user_cred')
        .updateOne(data.findUserData, { $set: { password: hashedPW } });
      res.status(200).send('비밀번호가 변경되었습니다');
    }
  }
};

export default ChangePassword;
