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
      html: `
      <table
      width="720"
      border="0"
      cellpadding="0"
      cellspacing="0"
      style="margin:0 auto"
    >
      <tbody>
        <tr>
          <td style="background:#fff">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td
                    style="padding: 0px 10px;font-size:1px;line-height:1px;border-bottom:0.5px #e94057 solid"
                  >
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/fling-fdf18.appspot.com/o/images%2Flogo%2Ficon.png?alt=media&token=127d7a4a-e68a-4f58-a2ec-4bba0ed2dd3f"
                      alt="fling"
                      style="width:50px; height:50px;"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td style="width:40px"></td>
                  <td style="padding:20px 0">
                    <table
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="font:30px Malgun Gothic;letter-spacing:-1px;color:#e94057;"
                          >
                            <span>[플링] 인증번호를 안내해 드려요</span>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="padding:10px 0px;font:16px/26px Malgun Gothic;color:#767676"
                          >
                            안녕하세요
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="font:16px/26px Malgun Gothic;color:#767676"
                          >
                            플링 회원가입을 위해 학교 이메일 인증이 필요해요<br />아래
                            인증 번호를 입력해주세요<br />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tbody>
                                <tr>
                                  <td style="display:block;"></td>
                                </tr>
                              </tbody>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0">
                              <tbody>
                                <tr>
                                  <td style="display:block;height:10px"></td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              style="width:100%"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="background:#e94057;font-size:1px;line-height:1px;height:1px"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              style="width:100%;table-layout:fixed;border-bottom:1px #e94057 solid"
                            >
                              <colgroup>
                                <col width="18%" />
                                <col />
                                <col width="18%" />
                                <col />
                              </colgroup>
                              <tbody>
                                <tr>
                                  <th
                                    style="padding:8px 0;font:bold 14px/20px Malgun Gothic;letter-spacing:-1px;color:#fff;text-align:center;background:#e94057;"
                                  >
                                    이메일
                                  </th>
                                  <td
                                    style="padding:8px 10px;font:14px/20px Malgun Gothic;color:#4b5964;border-left:1px #e0e0e0 solid;border-top:1px #e0e0e0 solid"
                                  >
                                    ${userEmail}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    style="padding:8px 0;font:bold 14px/20px Malgun Gothic;letter-spacing:-1px;color:#fff;text-align:center;background:#e94057;"
                                  >
                                    인증 번호
                                  </th>
                                  <td
                                    colspan="3"
                                    style="padding:8px 10px;font:14px/20px Malgun Gothic;color:#4b5964;border-left:1px #e0e0e0 solid;border-top:1px #e0e0e0 solid"
                                  >
                                    ${emailCode}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    style="padding:8px 0;font:bold 14px/20px Malgun Gothic;letter-spacing:-1px;color:#fff;text-align:center;background:#e94057;"
                                  >
                                    요청 시간
                                  </th>
                                  <td
                                    colspan="3"
                                    style="padding:8px 10px;font:14px/20px Malgun Gothic;color:#4b5964;border-left:1px #e0e0e0 solid;border-top:1px #e0e0e0 solid"
                                  >
                                    ${reqYear}-${reqMonth}-${reqDay} ${reqHour}:${reqMin}:${reqSec}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td style="width:40px"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
      `,
    };

    if (userEmail) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          transporter.close();
          return res.status(500).send(err);
        } else {
          console.log('email sent : ' + info.response);
          transporter.close();
          return res.status(200).send(emailCode);
        }
      });
    } else {
      return res.status(400).send('잘못된 접근입니다');
    }
  }
};

export default handleEmailCode;
