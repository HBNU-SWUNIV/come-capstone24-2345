import { connectDB } from "@/util/database";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_ADMIN)
    ),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

const getFCMToken = async (email) => {
  try {
    const client = await connectDB;
    const db = await client.db("Fling");

    const userDoc = await db.collection("user_cred").findOne({ email });
    if (userDoc && userDoc.token) {
      return userDoc.token;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
const sendFCMHandler = async (req, res) => {
  if (req.method === "POST") {
    const { message, email } = req.body;
    console.log(message);
    console.log(email);

    const token = await getFCMToken(email);

    // 수집된 FCM 토큰에 알림 전송
    const payload = {
      notification: {
        title: "플링",
        body: message,
      },
      token,
    };

    try {
      const response = await admin.messaging().send(payload);
      console.log("FCM 알림 전송 성공:", response);
      res.status(200).end();
    } catch (error) {
      console.error("FCM 알림 전송 실패:", error);
      res.status(500).end();
    }
  }
};

export default sendFCMHandler;
