import { connectDB } from '../../../util/database';

const handleSuccess = async (req, res) => {
  if (req.method === 'POST') {
    const {
      eventCode,
      email,
      emailCert,
      password,
      gender,
      name,
      birth,
      univ,
      department,
      nickname,
      mbti,
      height,
      drinkLimit,
      smoking,
      army,
      hobby,
      datingType,
      univCert,
      introduction,
      profileImg,
      studentIDImg,
      chatroomID,
      religion,
      role,
    } = req.body.info;

    if (
      eventCode !== '' &&
      email !== '' &&
      emailCert !== false &&
      password !== '' &&
      gender !== '' &&
      name !== '' &&
      birth !== null &&
      univ !== '' &&
      department !== '' &&
      nickname !== '' &&
      mbti !== '' &&
      height !== 0 &&
      hobby !== null &&
      datingType !== null &&
      introduction !== '' &&
      profileImg !== '' &&
      studentIDImg !== '' &&
      chatroomID !== '' &&
      religion !== ''
    ) {
      const client = await connectDB;
      const db = await client.db('Fling');

      try {
        const result = await db.collection('user_cred').insertOne({
          eventCode,
          email,
          emailCert,
          password,
          gender,
          name,
          birth,
          univ,
          department,
          nickname,
          mbti,
          height,
          drinkLimit,
          smoking,
          army,
          hobby,
          datingType,
          univCert,
          introduction,
          profileImg,
          studentIDImg,
          chatroomID,
          religion,
          role,
        });
        res.status(200).end();
      } catch (err) {
        res.status(500).send('잠시 후 다시 시도해주세요');
      }
    } else {
      res.status(400).send('잘못된 접근입니다');
    }
  }
};

export default handleSuccess;
