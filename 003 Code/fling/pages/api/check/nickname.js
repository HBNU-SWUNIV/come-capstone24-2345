import { connectDB } from '../../../util/database';

const CheckNickname = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await connectDB;
    const db = client.db('Fling');
    let result = await db
      .collection('user_cred')
      .find({
        nickname: data.nickname,
      })
      .toArray();

    const nicknameRegex = /[a-zA-Z가-힣]/;
    const koreanRegex = /([ㄱ-ㅎㅏ-ㅣ])/g;

    if (data.nickname === '') {
      res.status(400).send('닉네임을 입력해주세요');
    } else if (data.nickname.length < 4) {
      res.status(400).send('닉네임은 최소 4자 이상이어야 합니다');
    } else if (data.nickname.length > 8) {
      res.status(400).send('닉네임은 최대 8자까지 가능합니다');
    } else if (!nicknameRegex.test(data.nickname)) {
      res.status(400).send('한글이나 영어가 한 글자 이상 포함되어야 합니다');
    } else if (
      data.nickname.match(koreanRegex) !== null &&
      data.nickname.match(koreanRegex).length > 0
    ) {
      res.status(400).send('자음이나 모음은 단독으로 사용할 수 없습니다');
    } else if (result.length !== 0) {
      res.status(400).send('이미 존재하는 닉네임입니다');
    } else {
      res.status(200).send(data);
    }
  }
};

export default CheckNickname;
