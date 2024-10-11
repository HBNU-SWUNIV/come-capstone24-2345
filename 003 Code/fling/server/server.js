const next = require('next');
const express = require('express');
const cron = require('node-cron');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const https = require('https');
const fs = require('fs');
const { parse } = require('url');
const path = require('path');

const options = {
  key: fs.readFileSync(path.join(__dirname, '../localhost-key.pem'), 'utf-8'),
  cert: fs.readFileSync(path.join(__dirname, '../localhost.pem'), 'utf-8'),
};

dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_ADMIN)
  ),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
});
const firebaseDB = admin.firestore();
const firebaseStorage = admin.storage().bucket();

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * (i + 1));

    const temp = array[i];
    array[i] = array[randomPosition];
    array[randomPosition] = temp;
  }
  return array;
}

async function getAllDocumentIds(collectionPath) {
  const collectionRef = firebaseDB.collection(collectionPath);
  const snapshot = await collectionRef.get();

  const documentIds = snapshot.docs.map((doc) => doc.id);

  return documentIds;
}

app.prepare().then(() => {
  const server = express();

  let mongoDB;
  new MongoClient(process.env.DB_URL)
    .connect()
    .then((client) => {
      console.log('mongoDB 연결 성공');
      mongoDB = client.db('Fling');
    })
    .catch((err) => {
      console.log(err);
    });

  const deleteAllCredentials = async () => {
    try {
      await mongoDB.collection('user_cred').deleteMany({ role: 'normal' });
    } catch (err) {
      return err;
    }
  };

  const deleteAllSelectedGroup = async () => {
    try {
      await mongoDB.collection('selected_groups').deleteMany({});
    } catch (err) {
      return err;
    }
  };

  const deleteAllImages = async () => {
    try {
      const [files] = await firebaseStorage.getFiles({ prefix: 'images/' });

      files.map(async (file) => {
        const filePath = file.name;
        if (!filePath.startsWith('images/marker')) {
          await file.delete();
        }
      });
    } catch (err) {
      return err;
    }
  };

  const deleteAllChat = async () => {
    try {
      const chatroomRef = firebaseDB.collection('chatrooms');
      const chatroomSnapshot = await chatroomRef.get();
      if (!chatroomSnapshot.empty) {
        chatroomSnapshot.forEach(async (chatroomDoc) => {
          const messageRef = firebaseDB
            .collection('chatrooms')
            .doc(chatroomDoc.id)
            .collection('messages');
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

  // 유저 선정,남녀 그룹화 및 모든 데이터 삭제
  // 매주 월요일 오전 9시에 동작 => 0 9 * * 1
  cron.schedule('0 9 * * 1', async () => {
    try {
      await deleteAllCredentials();
      await deleteAllSelectedGroup();
      await deleteAllImages();
      await deleteAllChat();

      const allForm = await mongoDB.collection('form').find({}).toArray();

      if (allForm) {
        const man = allForm.filter((item) => item.gender === 'man');
        man.forEach((item) => {
          item.eventCode = Math.random()
            .toString(20)
            .substring(2, 8)
            .toUpperCase();
        });
        const woman = allForm.filter((item) => item.gender === 'woman');
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

        await mongoDB.collection('selected_groups').deleteMany({});

        const ids = await getAllDocumentIds('chatrooms');

        for (let id of ids) {
          await firebaseDB.collection('chatrooms').doc(id).delete();
        }

        for (const group of groups) {
          const chatroomID = Math.random()
            .toString(20)
            .substring(2, 12)
            .toUpperCase();

          const emails = group.map((item) => item.email);

          await firebaseDB.collection('chatrooms').doc(chatroomID).set({
            member: emails,
          });

          await mongoDB
            .collection('selected_groups')
            .insertOne({ group, chatroomID });
        }

        // await mongoDB.collection('form').deleteMany({});
        console.log('그룹화 완료');
      }
    } catch (err) {
      console.log(err);
    }
  });

  // 선정된 유저들에게 메일로 이벤트 코드 전송
  // 매주 월요일 오전 9시 10분에 동작 => 10 9 * * 1
  cron.schedule('10 9 * * 1', async () => {
    const groups = await mongoDB
      .collection('selected_groups')
      .find({})
      .toArray();

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

    transporter.sendMail(manMailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('email sent : ' + info.response);
        transporter.close();
      }
    });

    groups.forEach((element) => {
      const manEmail = element.group[0].email;
      const womanEmail = element.group[1].email;
      const manEventCode = element.group[0].eventCode;
      const womanEventCode = element.group[1].eventCode;

      const manMailOptions = {
        from: process.env.NEXT_PUBLIC_NODEMAILER_USER,
        to: manEmail,
        subject: '[플링] 선정된 유저 이벤트코드 발송 건',
        html: `<h2>안녕하세요 플링에 선정되셔서 메일을 전송합니다!</h2>
            <p>회원가입 시 아래의 이벤트 코드를 작성해주세요</p>
            <p>이벤트코드 : <u>${manEventCode}</u></p>`,
      };

      const womanMailOptions = {
        from: process.env.NEXT_PUBLIC_NODEMAILER_USER,
        to: womanEmail,
        subject: '[플링] 선정된 유저 이벤트코드 발송 건',
        html: `<h2>안녕하세요 플링에 선정되셔서 메일을 전송합니다!</h2>
            <p>회원가입 시 아래의 이벤트 코드를 작성해주세요</p>
            <p>이벤트코드 : <u>${womanEventCode}</u></p>`,
      };

      transporter.sendMail(manMailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log('email sent : ' + info.response);
      });

      transporter.sendMail(womanMailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log('email sent : ' + info.response);
      });
    });

    transporter.close();
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:', port);
  });

  https
    .createServer(options, async (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(port + 1, (err) => {
      if (err) throw err;
      console.log('> Ready on https://localhost:', port + 1);
    });
});
