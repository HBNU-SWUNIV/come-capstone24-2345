import { connectDB } from '@/util/database';

const FindUser = async (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    const client = await connectDB;
    const db = client.db('Fling');

    const birth = data.userBirth.slice(0, 10).split('-');
    const year = birth[0];
    const month = birth[1];
    const day = birth[2];

    const findUserData = {
      name: data.userName,
      univ: data.univ,
      department: data.department,
      email: data.email,
      birth: {
        year,
        month,
        day,
      },
    };
    let result = await db.collection('user_cred').find(findUserData).toArray();

    if (result.length != 0) {
      console.log(result[0].password);
      res.status(200).send(findUserData);
    } else {
      res
        .status(400)
        .send('입력하신 정보와 일치하는 유저가 존재하지 않습니다.');
      console.log('그런거 없음');
    }
  }
};

export default FindUser;
