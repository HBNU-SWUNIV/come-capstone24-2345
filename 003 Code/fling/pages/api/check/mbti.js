const CheckMbti = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    const hasEmptyValue = data.mbti.some((item) => item === '');

    if (hasEmptyValue) {
      res.status(400).send('고르지 않은 MBTI유형이 있습니다');
    } else {
      res.status(200).send(data.mbti);
    }
  }
};

export default CheckMbti;
