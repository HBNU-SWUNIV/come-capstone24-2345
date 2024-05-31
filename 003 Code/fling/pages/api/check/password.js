import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

const CheckPassword = async (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;
    console.log(data);

    // 숫자, 특수기호를 최소 하나 이상
    // 8자 이상
    const pwPattern = new RegExp(
      '^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$'
    );

    // 비밀번호 형식이 맞지 않다면
    if (pwPattern.exec(data.password) == null) {
      res.status(400).send('비밀번호는 조건에 맞게 입력해주세요');
    } else if (data.password != data.reEnterPassword) {
      res.status(400).send('비밀번호가 맞는지 다시 확인해주세요');
    } else {
      const hashedPW = await bcrypt.hash(data.password, 10);
      res.status(200).send(hashedPW);
    }
  }
};

export default CheckPassword;
