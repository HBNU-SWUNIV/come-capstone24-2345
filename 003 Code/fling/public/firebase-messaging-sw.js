importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
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
