const CheckUserInfo = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;
    console.log(data);
    const namePattern = new RegExp('^[가-힣]{2,4}$');
    // const birthYear = parseInt(data.userBirth.split('-')[0]);

    const birth = data.userBirth.slice(0, 10).split('-');
    const year = birth[0];
    const month = birth[1];
    const day = birth[2];
    console.log(year, month, day);
    if (data.userName == '') {
      res.status(400).send('이름을 입력해 주세요');
    } else if (!namePattern.test(data.userName)) {
      res.status(400).send('이름을 올바르게 입력해 주세요');
    } else if (year > 2003) {
      res.status(400).send('생년월일을 올바르게 선택해주세요');
    } else {
      res
        .status(200)
        .send({ userName: data.userName, userBirth: { year, month, day } });
    }
    //   res.status(400).send('생년월일을 입력해 주세요');
    // } else if (year < 1900 || year > 2100) {
    //   res.status(400).send('태어나신 년도를 올바르게 입력해 주세요');
    // } else if(month < 1 || month > 12){
    //   res.status(400).send("태어나신 월을 올바르게 입력해주세요")
    // } else if(day < 1 || )

    // res.status(200).send(data);
  }
};

export default CheckUserInfo;
