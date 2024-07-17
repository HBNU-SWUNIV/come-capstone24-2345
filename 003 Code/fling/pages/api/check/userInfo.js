const CheckUserInfo = (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const namePattern = new RegExp('^[가-힣]{2,4}$');

    // const birth = data.userBirth.slice(0, 10).split('-');
    // const year = birth[0];
    // const month = birth[1];
    // const day = birth[2];
    // console.log(year, month, day);
    const currentYear = new Date().getFullYear();

    if (data.name === '') {
      res.status(400).send('이름을 입력해 주세요');
    } else if (!namePattern.test(data.name)) {
      res.status(400).send('올바르지 않은 이름 형식입니다');
    } else if (currentYear - parseInt(data.birth.year) < 19) {
      res
        .status(400)
        .send(`${currentYear - 19}년생 이전의 대학생만 이용이 가능합니다`);
    } else {
      res.status(200).send({
        name: data.name,
        birth: {
          year: parseInt(data.birth.year),
          month: parseInt(data.birth.month),
          day: parseInt(data.birth.day),
        },
      });
    }
  }
};

export default CheckUserInfo;
