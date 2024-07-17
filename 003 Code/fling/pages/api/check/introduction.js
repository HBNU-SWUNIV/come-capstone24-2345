const CheckIntroduction = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    if (data.introduction == '') {
      res.status(400).send('한 줄 소개를 작성해주세요');
    } else {
      res.status(200).send(data);
    }
  }
};

export default CheckIntroduction;
