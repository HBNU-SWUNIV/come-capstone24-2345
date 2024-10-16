import nodemailer from 'nodemailer';

const handleEmailCode = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    const emailCode = Math.random().toString(20).substring(2, 8).toUpperCase();
    const requestDate = new Date();

    const reqYear = requestDate.getFullYear();
    const reqMonth =
      requestDate.getMonth() + 1 < 10
        ? `0${requestDate.getMonth() + 1}`
        : requestDate.getMonth() + 1;
    const reqDay =
      requestDate.getDate() < 10
        ? `0${requestDate.getDate()}`
        : requestDate.getDate();
    const reqHour =
      requestDate.getHours() < 10
        ? `0${requestDate.getHours()}`
        : requestDate.getHours();
    const reqMin =
      requestDate.getMinutes() < 10
        ? `0${requestDate.getMinutes()}`
        : requestDate.getMinutes();
    const reqSec =
      requestDate.getSeconds() < 10
        ? `0${requestDate.getSeconds()}`
        : requestDate.getSeconds();

    console.log(emailCode);
    res.status(200).send(emailCode);
    const transporter = nodemailer.createTransport({
      service: 'naver',
      host: 'smtp.naver.com',
      secure: false,
      port: 465,
      auth: {
        user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
        pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_NODEMAILER_USER,
      to: userEmail,
      subject: '[플링] 인증번호 전송 건',
      html: `<h2>안녕하세요 플링 이메일 인증코드 입니다!</h2>
            <p>입력란에 인증코드를 작성해주세요</p>
            <p>인증코드 : <u>${emailCode}</u></p>`,
    };

    if (userEmail) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          transporter.close();
          res.status(500).send(err);
        } else {
          console.log('email sent : ' + info.response);
          transporter.close();
          res.status(200).send(emailCode);
        }
      });
    } else {
      transporter.close();
      return res.status(400).send('잘못된 접근입니다');
    }
  }
};

export default handleEmailCode;
