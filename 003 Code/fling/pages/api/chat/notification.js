import { connectDB } from '@/util/database';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY?.replace(
      /\\n/g,
      '\n'
    ),
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  };
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const getFCMToken = async (email) => {
  try {
    const client = await connectDB;
    const db = await client.db('Fling');

    const userDoc = await db.collection('user_cred').findOne({ email });
    if (userDoc && userDoc.token) {
      return userDoc.token;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
const sendFCMHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { message, emails } = req.body;
    console.log(message);
    console.log(emails);

    const tokens = [];

    for (const email of emails) {
      const token = await getFCMToken(email);
      if (token) {
        tokens.push(token);
      }
    }

    // 수집된 FCM 토큰에 알림 전송
    for (const token of tokens) {
      const payload = {
        notification: {
          title: '플링',
          body: message,
        },
        token,
      };

      try {
        const response = await admin.messaging().send(payload);
        console.log('FCM 알림 전송 성공:', response);
        res.status(200).end();
      } catch (error) {
        console.error('FCM 알림 전송 실패:', error);
        res.status(500).end();
      }
    }
  }
};

export default sendFCMHandler;
