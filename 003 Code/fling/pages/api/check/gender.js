const CheckGender = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    if (data.gender == 'man') {
      res.status(200).send('man');
    } else if (data.gender == 'woman') {
      res.status(200).send('woman');
    } else {
      res.status(400).send('성별을 선택해주세요');
    }
  }
};

export default CheckGender;
