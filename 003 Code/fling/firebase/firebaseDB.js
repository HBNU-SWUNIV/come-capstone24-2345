// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getToken } from 'firebase/messaging';
import { getMessaging } from 'firebase/messaging';
import axios from 'axios';
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

// export const messaging = getMessaging(app);
// export const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

// export const getFCMToken = async () => {
//   return await getToken(messaging, { vapidKey })
//     .then(async (currentToken) => {
//       if (!currentToken) {
//         console.error('토큰 생성 불가');
//       } else {
//         return currentToken;
//       }
//     })
//     .catch((error) => {
//       console.error('token error', error);
//     });
// };
