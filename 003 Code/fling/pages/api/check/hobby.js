const CheckHobby = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    if (data.hobby.length == 0) {
      res.status(400).send('취미를 하나 이상 선택하거나 입력해주세요');
    } else {
      res.status(200).send({ hobby: [...new Set(data.hobby)] });
    }
  }
};

export default CheckHobby;
