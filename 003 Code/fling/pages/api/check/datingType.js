const CheckDatingType = (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    if (data.tendency.includes(null)) {
      res.status(400).send('선택하지 않은 질문이 있습니다');
    } else {
      let score = 0;
      let type;
      let description;

      data.tendency.map((element) => {
        switch (element) {
          case 0:
            score += 3;
            break;
          case 1:
            score += 2;
            break;
          case 2:
            score += 1;
            break;
        }
      });

      console.log(score);
      if (score <= 6) {
        type = '독립적인 유형';
        description =
          '연애를 하면서도 개인의 독립성을 유지하며, 서로의 공간과 시간을 존경해요';
      } else if (score > 6 && score <= 10) {
        type = '이성적인 유형';
        description =
          '감정보다 이성을 중시하며, 논리적이고 계획적인 연애를 해요';
      } else if (score > 10 && score <= 12) {
        type = '열정적인 유형';
        description = '강렬한 감정 표현과 함께, 극적인 순간이 많은 연애를 해요';
      } else if (score > 12 && score <= 15) {
        type = '친구같은 유형';
        description =
          '연애 상대를 친구처럼 편하게 대하며, 안정적이고 즐거운 관계를 추구해요';
      } else {
        type = '로맨틱한 유형';
        description =
          '감정 표현이 풍부하고, 상대방을 특별하게 대하는 것을 중요시해요';
      }

      res.status(200).send({ type, description });
    }
  }
};

export default CheckDatingType;
