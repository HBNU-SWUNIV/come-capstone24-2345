importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

firebase.initializeApp({
  apiKey: "AIzaSyAHhx78eI6EjzE6B14Rt50YWfa-VtW2ss0",
  authDomain: "fling-fdf18.firebaseapp.com",
  projectId: "fling-fdf18",
  storageBucket: "fling-fdf18.appspot.com",
  messagingSenderId: "471265466293",
  appId: "1:471265466293:web:627e905385ee46b8e3abfc",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(messaging, (payload) => {
  const title = payload.title;
  const options = {
    body: payload.body,
    icon: "https://firebasestorage.googleapis.com/v0/b/fling-fdf18.appspot.com/o/images%2Flogo%2Ficon.png?alt=media&token=127d7a4a-e68a-4f58-a2ec-4bba0ed2dd3f",
  };

  self.registration.showNotification(title, options);
});

// 푸시 내용을 처리해서 알림으로 띄운다.
// self.addEventListener('push', function (event) {});

// // 클릭 이벤트 처리 - 알림을 클릭하면 사이트로 이동한다.
// self.addEventListener('notificationclick', function (event) {});
