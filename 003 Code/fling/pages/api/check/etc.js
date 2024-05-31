const CheckEtc = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;
    console.log(data);

    if (data.height == null || data.height >= 250) {
      res.status(400).send('키를 정확하게 입력해주세요');
    } else if (data.smoking == null) {
      res.status(400).send('흡연여부를 선택해주세요');
    } else {
      res.status(200).send(data);
    }
  }
};

export default CheckEtc;
