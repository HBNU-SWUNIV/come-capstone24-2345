import admin from 'firebase-admin';

const sendFCMNotification = async (data) => {
  const serviceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  };

  if (!admin.app.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  //몽고디비에서 토큰 가져오기
  const tokenList = [];

  const notificationData = {
    ...data,
    tokens: tokenList,
  };

  const result = await admin.messaging().sendEachForMulticast(notificationData);
  return result;
};

const sendHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { message } = req.body;
    try {
      const result = await sendFCMNotification(message);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
};

export default sendHandler;
