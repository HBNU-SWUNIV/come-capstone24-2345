'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { io } from 'socket.io-client';

// const socket = io();

const ChatPage = (props) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  //   useEffect(() => {
  //     socket.on('chat message', (msg) => {
  //       setMessages((prev) => [...prev, msg]);
  //     });

  //     return () => {
  //       socket.off('chat message');
  //     };
  //   }, []);

  //   const sendMessage = (e) => {
  //     e.preventDefault();
  //     socket.emit('chat message', message);
  //     setMessage('');
  //   };
  useEffect(() => {
    console.log(props.params.id);
  }, []);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setMessages((prev) => [...prev, message]);
    setMessage('');
  };

  return (
    <div className='w-full h-screen relative'>
      <OtherChat>
        <Profile />
        <OtherMessageBox>
          <OtherMessage>
            Hello world! Here is your workspace! Welcome! I love JavaScript
          </OtherMessage>
          <SendTime>13:41</SendTime>
        </OtherMessageBox>
      </OtherChat>

      {/* {
      만약 props.params.id가 내 id와 같다면 <MyChat>에 나의 메세지들 작성
    } */}

      {messages.map((element, index) => {
        return (
          <MyChat key={element}>
            <MyMessageBox>
              <SendTime>13:41</SendTime>
              <MyMessage>{element}</MyMessage>
            </MyMessageBox>
          </MyChat>
        );
      })}
      {/* <MyChat>
        <MyMessageBox>
          <SendTime>13:41</SendTime>
          <MyMessage>
            Hello world! Here is your workspace! Welcome! I love JavaScript. Do
            you like JavaScript?
          </MyMessage>
        </MyMessageBox>
      </MyChat> */}

      <MessageInput className='bottom-0'>
        <div className='w-full flex gap-[10px]'>
          <img src='/main/chat/plus.svg' />
          <form
            className='flex-grow h-full rounded-full flex items-center py-[5px] pl-[20px] pr-[10px] bg-white border border-solid border-main-red'
            onSubmit={handleSend}
          >
            <input
              className='flex-grow bg-transparent'
              onChange={handleMessage}
              value={message}
            />
            <button type='submit' className='size-[25px]'>
              <img className='size-full' src='/main/chat/send.svg' alt='send' />
            </button>
          </form>
        </div>
      </MessageInput>
    </div>
  );
};

export default ChatPage;

const OtherChat = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  height: auto;
  margin: 45px 0;
`;

const MyChat = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: auto;
  margin: 20px 0;
`;

const Profile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid #e94057;
`;

const OtherMessageBox = styled.div`
  width: auto;
  max-width: 60%;
  text-align: start;
  height: auto;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  top: 25px;
`;

const OtherMessage = styled.p`
  word-break: keep-all;
  border: 1px solid #e94057;
  border-radius: 15px;
  border-top-left-radius: 0;
  font-size: 12px;
  padding: 10px 15px;
`;

const MyMessageBox = styled.div`
  width: auto;
  max-width: 60%;
  text-align: start;
  height: auto;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  top: 25px;
`;

const MyMessage = styled.p`
  word-break: keep-all;
  background-color: #e94057;
  border-radius: 15px;
  border-top-right-radius: 0;
  color: white;
  font-size: 12px;
  padding: 10px 15px;
`;

const MessageInput = styled.div`
  padding: 20px 10px;
  width: 100%;
  height: 50vh;
  position: absolute;
  background-color: rgba(255, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SendTime = styled.p`
  font-size: 10px;
`;
