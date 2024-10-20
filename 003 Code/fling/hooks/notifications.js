export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker 등록 성공:", registration.scope);
        })
        .catch((error) => {
          console.log("Service Worker 등록 실패:", error);
        });
    });
  }
};

// export const sendNotification = (title, body) => {
//   if ('serviceWorker' in navigator && 'PushManager' in window) {
//     navigator.serviceWorker.ready.then((registration) => {
//       registration.showNotification(title, {
//         body,
//         icon: '/icons/pwa-icons/icon-192x192.png',
//       });
//     });
//   }
// };

// export const sendFCMNotification = async (data) => {
//   const serviceAccount = {
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY?.replace(
//       /\\n/g,
//       '\n'
//     ),
//     clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
//   };

//   if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
//   }

//   const notification = { data };
//   const res = await admin.messaging().send(notification);
//   return res;
// };
