'use client';

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@nextui-org/react';
import BottomInputNav from './BottomInputNav';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseDB';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import { easeInOut } from 'framer-motion';

const ClientComponent = ({ currUser }) => {
  const [chatData, setChatData] = useState([]);
  const [arr, setArr] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isClickPlusBtn, setIsClickPlusBtn] = useState(false);

  const chatroomID = usePathname().split('/')[2];
  const chatRef = useRef();
  const bottomNavRef = useRef();

  useOnClickOutside(bottomNavRef, () => {
    setIsClickPlusBtn(false);
  });

  useEffect(() => {
    const messagesRef = collection(db, 'chatrooms', chatroomID, 'messages');
    const q = query(messagesRef, orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        arr.push({
          date: data.date,
          message: data.message,
          email: data.email,
        });
      });
      setArr(arr);
    });

    return () => unsub;
  }, []);

  // useEffect(() => {
  //   if (chatRef.current) {
  //     chatRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [chatData, isClickPlusBtn]);

  const OtherChat = (msg, currSecond) => {
    const date = currSecond.toDate();
    return (
      <div
        key={msg + currSecond}
        className='w-full flex justify-start items-end gap-[10px] mb-[20px]'
      >
        <div className='w-fit max-w-[60%] border border-main-red border-solid rounded-[15px] text-start px-[20px] py-[10px] bg-white relative'>
          <span className='text-subtitle'>{msg}</span>
        </div>
        <span className='text-info'>{`${date.getHours()}:${date.getMinutes()}`}</span>
      </div>
    );
  };

  const MyChat = (msg, currSecond) => {
    const date = currSecond.toDate();
    return (
      <div
        key={msg + currSecond}
        className='w-full flex justify-end items-end gap-[10px] mb-[20px]'
      >
        <span className='text-info'>{`${date.getHours()}:${date.getMinutes()}`}</span>
        <div className='w-fit max-w-[60%] border border-main-red border-solid bg-main-red rounded-[15px] text-start px-[20px] py-[10px] relative'>
          <span className='text-subtitle text-white'>{msg}</span>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full h-dvh bg-gray-100 relative flex flex-col'>
      <div className='w-full flex-1 overflow-y-scroll px-[40px] pt-[80px] pb-[20px]'>
        {arr.map((data) => {
          if (currUser.email === data.email) {
            return MyChat(data.message, data.date);
          } else {
            return OtherChat(data.message, data.date);
          }
        })}
        <div ref={chatRef}></div>
      </div>

      <motion.nav
        transition={easeInOut}
        ref={bottomNavRef}
        className='w-full h-fit bg-white flex flex-col gap-[20px]'
      >
        <div className='w-full h-fit flex justify-between items-center gap-[15px] px-[15px] py-[10px]'>
          <button
            className='size-[30px] relative'
            onClick={() => setIsClickPlusBtn((prev) => !prev)}
          >
            <Image src='/chatting/plus.svg' fill alt='plus' />
          </button>
          <Textarea
            minRows={1}
            maxRows={3}
            classNames={{
              inputWrapper:
                'rounded-medium px-[20px] bg-white border border-main-red border-solid shadow-none group-data-[focus=true]:bg-transparent data-[hover=true]:bg-transparent',
            }}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder='메세지를 입력하세요'
          />
          <button className='size-[30px] relative'>
            <Image src='/chatting/send.svg' fill alt='send' />
          </button>
        </div>

        {isClickPlusBtn && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='w-full h-fit px-[50px] pb-[50px] bg-white flex justify-center items-center flex-wrap gap-[20px]'
          >
            <button className='full-btn size-[60px] rounded-full'></button>
            <button className='full-btn size-[60px] rounded-full'></button>
            <button className='full-btn size-[60px] rounded-full'></button>
            <button className='full-btn size-[60px] rounded-full'></button>
            <button className='full-btn size-[60px] rounded-full'></button>
          </motion.div>
        )}
      </motion.nav>

      {/* <BottomInputNav
          isClickPlusBtn={isClickPlusBtn}
          setIsClickPlusBtn={setIsClickPlusBtn}
          plusBtnRef={plusBtnRef}
          chatroomID={chatroomID}
          currUser={currUser}
        /> */}
    </div>
  );
};

export default ClientComponent;

const InputNav = styled.div``;
