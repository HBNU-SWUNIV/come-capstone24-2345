const handleCheckEmail = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    const emailPattern = [
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.ac.kr$', //아래를 제외한 모든 대학
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.chungkang.academy$', // 청강문화산업대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.hanma.kr$', // 겅냠대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.kiu.kr$', // 겅냠대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.cuk.edu$', // 고려사이버대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.gcu.ac$', // 국제사이버대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.dongguk.edu$', // 동국대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.dsu.kr$', // 동신대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.sangmyung.kr$', // 상명대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.skku.edu$', // 성균관대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.kcu.ac$', // 숭실사이버대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.ewhain.net$', // 이화여대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.inha.edu$', // 인하대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.jnue.kr$', // 전주교대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.chosun.kr$', // 조선대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.kau.kr$', // 한국항공대
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.handong.edu$', // 한동대
    ];

    const validateEmail = (email) => {
      return emailPattern.some((regex) => new RegExp(regex).test(email));
    };

    if (data.email === '') {
      res.status(400).send('학교 이메일을 입력해주세요');
    } else if (!validateEmail(data.email)) {
      res.status(400).send('이메일이 올바르지 않은 형식입니다');
    } else {
      let verificationCode =
        Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      console.log(verificationCode);

      data.verificationCode = verificationCode;
      res.status(200).send(data);
    }
  }
};

export default handleCheckEmail;
