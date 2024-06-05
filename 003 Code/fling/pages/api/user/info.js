import { connectDB } from '@/util/database';

const userInfoHandler = async (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    const client = await connectDB;
    const db = client.db('Fling');

    let result = await db.collection('user_cred').insertOne(data);

    console.log(result);

    res.status(200).send('회원가입을 축하드립니다!');
  }
};

export default userInfoHandler;
