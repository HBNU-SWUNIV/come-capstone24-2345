'use client';

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import React, { useEffect, useRef, useState } from 'react';
import BottomInputNav from './BottomInputNav';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseDB';

const ClientComponent = ({ currUser }) => {
  const [chatData, setChatData] = useState([]);
  const [isClickPlusBtn, setIsClickPlusBtn] = useState(false);

  const chatRef = useRef();

  const plusBtnRef = useRef(null);
  useOnClickOutside(plusBtnRef, () => {
    setIsClickPlusBtn(false);
  });

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.docs.forEach((doc) => {
        arr.push(doc.data());
      });
      setChatData(arr);
    });

    return () => unsub;
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatData, isClickPlusBtn]);

  const OtherChat = (msg, currSecond) => {
    const date = currSecond.toDate();
    return (
      <div
        key={msg + currSecond}
        className='w-full flex justify-start items-end gap-[10px] mb-[20px]'
      >
        <div className='w-fit max-w-[60%] border border-main-red border-solid rounded-[15px] text-start px-[20px] py-[10px] relative'>
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
    <div className='w-full h-screen px-[40px] relative flex flex-col'>
      <div
        className={`h-screen overflow-y-scroll mt-[100px] ${isClickPlusBtn ? 'pb-[280px]' : 'pb-[50px]'} `}
      >
        <div className='flex flex-col gap-[5px] my-[10px] items-center text-black/70'>
          {/* <span className='w-fit px-[10px]'>D+2</span> */}
          {/* <span className='w-fit px-[10px]'>2024.06.31 수요일</span> */}
        </div>
        {chatData.map((data) => {
          if (currUser.email === data.email) {
            return MyChat(data.message, data.date);
          } else {
            return OtherChat(data.message, data.date);
          }
        })}
        <div ref={chatRef}></div>
      </div>

      <BottomInputNav
        isClickPlusBtn={isClickPlusBtn}
        setIsClickPlusBtn={setIsClickPlusBtn}
        plusBtnRef={plusBtnRef}
        currUser={currUser}
      />
    </div>
  );
};

export default ClientComponent;
