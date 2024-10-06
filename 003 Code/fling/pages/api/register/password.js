import bcrypt from 'bcryptjs';

const handlePassword = async (req, res) => {
  if (req.method === 'POST') {
    const password = req.body.password;

    if (password) {
      const hashedPW = await bcrypt.hash(password, 10);
      res.status(200).send(hashedPW);
    } else {
      res.status(400).send('비밀번호를 입력해주세요');
    }
  }
};

export default handlePassword;
