const handleUser = async (req, res) => {
  if (req.method === 'POST') {
    const name = req.body.name;
    const birth = req.body.birth;

    const namePattern = new RegExp('^[가-힣]{2,4}$');
    const date = new Date();

    let age = date.getFullYear() - birth.year;
    const monthDiff = date.getMonth() + 1 - birth.month;
    const dayDiff = date.getDate() - birth.day;

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (!namePattern.test(name)) {
      res.status(400).send('올바르지 않은 이름 형식입니다');
    } else if (age < 19) {
      res.status(400).send(`만 19세 이상의 대학생만 이용이 가능합니다`);
    } else {
      res.status(200).send({ name, birth });
    }
  }
};

export default handleUser;
