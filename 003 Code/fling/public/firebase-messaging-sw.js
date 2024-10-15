importScripts(
  'https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyAHhx78eI6EjzE6B14Rt50YWfa-VtW2ss0',
  authDomain: 'fling-fdf18.firebaseapp.com',
  projectId: 'fling-fdf18',
  storageBucket: 'fling-fdf18.appspot.com',
  messagingSenderId: '471265466293',
  appId: '1:471265466293:web:627e905385ee46b8e3abfc',
});

const messaging = firebase.messaging();

// 푸시 내용을 처리해서 알림으로 띄운다.
self.addEventListener('push', function (event) {});

// 클릭 이벤트 처리 - 알림을 클릭하면 사이트로 이동한다.
self.addEventListener('notificationclick', function (event) {});
