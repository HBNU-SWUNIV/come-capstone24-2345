'use client';

import { useEffect } from 'react';
// import { io } from 'socket.io-client';

// const socket = io();

const ChatLayout = ({ children }) => {
  //   useEffect(() => {
  //     socket.on('connect', () => {
  //       console.log('Connect to server');
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  return <>{children}</>;
};

export default ChatLayout;
