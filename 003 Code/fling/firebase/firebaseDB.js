// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
let messaging;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export { messaging };

export const getTokenHandler = async (userEmail) => {
  if (!messaging) return;

  await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  })
    .then(async (currentToken) => {
      if (!currentToken) {
        // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당한다.
        console.log("토큰 생성 불가");
      } else {
        // 토큰을 받았다면 여기서 DB에 저장하면 됩니다.
        await axios.post("/api/chat/setFCMToken", {
          token: currentToken,
          email: userEmail,
        });
        console.log("ok");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
