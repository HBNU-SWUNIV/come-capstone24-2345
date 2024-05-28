const CheckGender = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;
    console.log(data);

    if (data.gender == 'man') {
      res.status(200).send(true);
    } else if (data.gender == 'woman') {
      res.status(200).send(false);
    } else {
      res.status(400).send('성별을 선택해주세요');
    }
  }
};

export default CheckGender;
