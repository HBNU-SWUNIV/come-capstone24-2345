const userUnivHandler = async (req, res) => {
  if (req.method == 'POST') {
    const data = req.body;

    console.log(data);

    // if(이메일 형식이면 대학인증 진행){
    //     // univcert를 통해 인증
    //         // 대학인증이 되었다면 해당 이메일로 인증번호 전송

    // } else {
    //     // 이메일 형식이 아니면 재입력 하라고 전송
    // }
  }
};

export default userUnivHandler;
