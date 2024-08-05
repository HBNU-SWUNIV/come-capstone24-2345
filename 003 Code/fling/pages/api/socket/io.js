// pages/api/socket.js
import { Server } from 'socket.io';

const IOHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (msg) => {
      console.log('Message received:', msg);
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  res.end();
};

export default IOHandler;
