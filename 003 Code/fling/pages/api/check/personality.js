const CheckPersonality = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    if (data.personality.length == 0) {
      res.status(400).send('성격을 하나 이상 선택하거나 입력해주세요');
    } else {
      res.status(200).send({ personality: [...new Set(data.personality)] });
    }
  }
};

export default CheckPersonality;
