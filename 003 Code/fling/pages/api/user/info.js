const userInfoHandler = async (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    console.log('최종 : ' + JSON.stringify(data));

    const results = data.map((request, index) => {
      // 여기서 각 요청을 개별적으로 처리
      // 예시로 요청의 내용을 그대로 응답에 포함
      // return { index, data: request };
    });

    // res.status(200).json({ results });
  }
};

export default userInfoHandler;
