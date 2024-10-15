import admin from 'firebase-admin';

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          alert('Service Worker 등록 성공');
        })
        .catch((error) => {
          alert('Service Worker 등록 실패');
        });
    });
  }
};

export const requestNotificationPermission = () => {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((p) => {
        if (p === 'granted') {
          alert('알림 권한이 허용되었습니다');
        } else {
          alert('알림 권한이 거부되었습니다');
        }
      });
    } else if (Notification.permission === 'granted') {
      alert('알림 권한이 이미 허용되었습니다');
    } else {
      alert('알림이 차단되어 있어 브라우저 설정에서 알림 권한을 허용해주세요');
    }
  }
};

export const sendNotification = (title, body) => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        body,
        icon: '/icons/pwa-icons/icon-192x192.png',
      });
    });
  }
};

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
