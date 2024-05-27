const CheckUserInfo = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    const namePattern = new RegExp('^[가-힣]{2,4}$');
    const birthYear = parseInt(data.userBirth.split('-')[0]);

    if (data.userName == '') {
      res.status(400).send('이름을 입력해 주세요');
    } else if (!namePattern.test(data.userName)) {
      res.status(400).send('이름을 올바르게 입력해 주세요');
    } else if (data.userBirth == '') {
      res.status(400).send('생년월일을 입력해 주세요');
    } else if (birthYear < 1900 || birthYear > 2100) {
      res.status(400).send('생년월일을 올바르게 입력해 주세요');
    } else {
      res.status(200).send(data);
    }
  }
};

export default CheckUserInfo;
