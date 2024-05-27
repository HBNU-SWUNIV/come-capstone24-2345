const CheckNickname = (req, res) => {
  if (req.method == 'GET') {
    const data = req.query;
    console.log(data);

    // data.nickname이 DB에 존재한다면
    // res.status(400).send('이미 존재하는 닉네임입니다');

    // 형식에 맞지 않는 닉네임이라면
    if (data.nickname == '') {
      res.status(400).send('올바르지 않은 닉네임입니다');
    } else {
      // 모든 조건에 부합한다면
      res.status(200).send('OK');
    }
  }
};

export default CheckNickname;
