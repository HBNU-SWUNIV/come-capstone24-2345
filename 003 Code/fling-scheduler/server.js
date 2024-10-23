const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
dotenv.config();
const app = express();
const port = parseInt(process.env.PORT || "8080", 10);

app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN)),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const firebaseDB = admin.firestore();
const firebaseStorage = admin.storage().bucket();

let mongoDB;
new MongoClient(process.env.DB_URL)
  .connect()
  .then((client) => {
    console.log("mongoDB 연결 성공");
    mongoDB = client.db("Fling");
    app.listen(port, () => {
      console.log(`http://localhost:${port} 에서 서버 실행 중`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const deleteAllCredentials = async () => {
  try {
    await mongoDB.collection("user_cred").deleteMany({ role: "normal" });
  } catch (err) {
    return err;
  }
};

const deleteAllSelectedGroup = async () => {
  try {
    await mongoDB.collection("selected_groups").deleteMany({});
  } catch (err) {
    return err;
  }
};

const deleteAllImages = async () => {
  try {
    const [files] = await firebaseStorage.getFiles({ prefix: "images/" });

    files.map(async (file) => {
      const filePath = file.name;
      if (
        !filePath.startsWith("images/marker") &&
        !filePath.startsWith("images/logo")
      ) {
        await file.delete();
      }
    });
  } catch (err) {
    return err;
  }
};

const deleteAllChat = async () => {
  try {
    const chatroomRef = firebaseDB.collection("chatrooms");
    const chatroomSnapshot = await chatroomRef.get();
    if (!chatroomSnapshot.empty) {
      chatroomSnapshot.forEach(async (chatroomDoc) => {
        const messageRef = firebaseDB
          .collection("chatrooms")
          .doc(chatroomDoc.id)
          .collection("messages");
        const messageSnapshot = await messageRef.get();

        if (!messageSnapshot.empty) {
          messageSnapshot.forEach(async (messageDoc) => {
            await messageDoc.ref.delete();
          });
        }

        await chatroomDoc.ref.delete();
      });
    }
  } catch (err) {
    return err;
  }
};

// 0 9 * * 1
const deleteAndGroupingJob = schedule.scheduleJob("*/2 * * * *", async () => {
  //   console.log(
  //     "매주 월요일 오전 9시마다 유저 데이터 삭제 및 유저 선정 작업 시작"
  //   );

  console.log("2분마다 유저 데이터 삭제 작업 시작");

  try {
    await deleteAllCredentials();
    await deleteAllSelectedGroup();
    await deleteAllImages();
    await deleteAllChat();

    console.log("유저 데이터 삭제 완료");

    const allForm = await mongoDB.collection("form").find({}).toArray();

    if (allForm) {
      const man = allForm.filter((item) => item.gender === "man");
      man.forEach((item) => {
        item.eventCode = Math.random()
          .toString(20)
          .substring(2, 8)
          .toUpperCase();
      });
      const woman = allForm.filter((item) => item.gender === "woman");
      woman.forEach((item) => {
        item.eventCode = Math.random()
          .toString(20)
          .substring(2, 8)
          .toUpperCase();
      });
      const minLength = Math.min(man.length, woman.length);
      const randomLength = Math.floor(Math.random() * minLength) + 1;

      const selectedMan = shuffle(man.slice(0, randomLength));
      const selectedWoman = shuffle(woman.slice(0, randomLength));

      const groups = selectedMan.map((element, idx) => {
        return [element, selectedWoman[idx]];
      });

      for (const group of groups) {
        const chatroomID = Math.random()
          .toString(20)
          .substring(2, 12)
          .toUpperCase();

        const emails = group.map((item) => item.email);

        await firebaseDB
          .collection("chatrooms")
          .doc(chatroomID)
          .set({
            member: emails,
            active: {
              [emails[0].split("@")[0]]: {
                state: false,
                lastDate: new Date(),
              },
              [emails[1].split("@")[0]]: {
                state: false,
                lastDate: new Date(),
              },
            },
          });

        await mongoDB
          .collection("selected_groups")
          .insertOne({ group, chatroomID });
      }

      await mongoDB.collection("form").deleteMany({});
      console.log("그룹화 완료");
    }
  } catch (err) {
    console.log(err);
  }
});

// 10 9 * * 1
const sendEmailJob = schedule.scheduleJob("*/4 * * * *", async () => {
  //   console.log("매주 월요일 오전 9시 10분마다 이벤트코드 전송 작업 시작");
  console.log("4분마다 이벤트코드 전송 작업 시작");
  const groups = await mongoDB.collection("selected_groups").find({}).toArray();

  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    secure: false,
    port: 465,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  groups.forEach((element) => {
    const manEmail = element.group[0].email;
    const womanEmail = element.group[1].email;
    const manEventCode = element.group[0].eventCode;
    const womanEventCode = element.group[1].eventCode;
    const responseDate = new Date();
    const resYear = responseDate.getFullYear();
    const resMonth =
      responseDate.getMonth() + 1 < 10
        ? `0${responseDate.getMonth() + 1}`
        : responseDate.getMonth() + 1;
    const resDay =
      responseDate.getDate() < 10
        ? `0${responseDate.getDate()}`
        : responseDate.getDate();
    const resHour =
      responseDate.getHours() < 10
        ? `0${responseDate.getHours()}`
        : responseDate.getHours();
    const resMin =
      responseDate.getMinutes() < 10
        ? `0${responseDate.getMinutes()}`
        : responseDate.getMinutes();
    const resSec =
      responseDate.getSeconds() < 10
        ? `0${responseDate.getSeconds()}`
        : responseDate.getSeconds();

    const manMailOptions = {
      from: process.env.NODEMAILER_USER,
      to: manEmail,
      subject: "[플링] 선정된 유저 이벤트코드 발송 건",
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
                            <span>[플링] 이벤트코드를 안내해 드려요</span>
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
                            플링에 선정되셔서 메일을 전송합니다!<br />회원가입 시 아래의 이벤트 코드를 작성해주세요<br />
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
                                    이벤트코드
                                  </th>
                                  <td
                                    style="padding:8px 10px;font:14px/20px Malgun Gothic;color:#4b5964;border-left:1px #e0e0e0 solid;border-top:1px #e0e0e0 solid"
                                  >
                                    ${manEventCode}
                                  </td>
                                </tr>
                                 <tr>
                                  <th
                                    style="padding:8px 0;font:bold 14px/20px Malgun Gothic;letter-spacing:-1px;color:#fff;text-align:center;background:#e94057;"
                                  >
                                    전송 시간
                                  </th>
                                  <td
                                    style="padding:8px 10px;font:14px/20px Malgun Gothic;color:#4b5964;border-left:1px #e0e0e0 solid;border-top:1px #e0e0e0 solid"
                                  >
                                    ${resYear}-${resMonth}-${resDay} ${resHour}:${resMin}:${resSec}
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

    const womanMailOptions = {
      from: process.env.NODEMAILER_USER,
      to: womanEmail,
      subject: "[플링] 선정된 유저 이벤트코드 발송 건",
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
                            <span>[플링] 이벤트코드를 안내해 드려요</span>
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
                            플링에 선정되셔서 메일을 전송합니다!<br />회원가입 시 아래의 이벤트 코드를 작성해주세요<br />
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
                                    이벤트코드
                                  </th>
                                  <td
                                    style="padding:8px 10px;font:14px/20px Malgun Gothic;color:#4b5964;border-left:1px #e0e0e0 solid;border-top:1px #e0e0e0 solid"
                                  >
                                    ${womanEventCode}
                                  </td>
                                </tr>
                                 <tr>
                                  <th
                                    style="padding:8px 0;font:bold 14px/20px Malgun Gothic;letter-spacing:-1px;color:#fff;text-align:center;background:#e94057;"
                                  >
                                    전송 시간
                                  </th>
                                  <td
                                    style="padding:8px 10px;font:14px/20px Malgun Gothic;color:#4b5964;border-left:1px #e0e0e0 solid;border-top:1px #e0e0e0 solid"
                                  >
                                    ${resYear}-${resMonth}-${resDay} ${resHour}:${resMin}:${resSec}
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

    transporter.sendMail(manMailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log("email sent : " + info.response);
    });

    transporter.sendMail(womanMailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log("email sent : " + info.response);
    });
  });

  console.log("이벤트코드 발송 완료");

  await mongoDB.colletion("form").deleteMany({});
  console.log("신청정보 삭제완료");

  transporter.close();
});
