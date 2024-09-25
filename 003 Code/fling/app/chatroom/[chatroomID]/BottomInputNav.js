'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { easeInOut } from 'framer-motion';
import Image from 'next/image';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseDB';

const BottomInputNav = (props) => {
  const [message, setMessage] = useState('');

  const funcBtn = (funcName, funcKorean) => {
    return (
      <div className='flex flex-col gap-[10px] justify-center items-center'>
        <button
          // onClick={func}
          className='w-fit flex justify-center items-center rounded-full bg-main-red p-[15px] active:scale-80 transition ease-in-out'
        >
          <Image
            src={`/chatting/${funcName}.svg`}
            alt={funcName}
            width={25}
            height={25}
          />
        </button>
        <span className='text-subtitle'>{funcKorean}</span>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message !== '') {
      const docData = {
        email: props.currUser.email,
        message,
        date: new Date(),
      };
      //   await setDoc(doc(db, 'chatrooms', 'chatroom1'), docData);
      await addDoc(collection(db, 'messages'), docData).then(() => {
        setMessage('');
      });
    }
  };

  return (
    <motion.nav
      animate={{
        bottom: props.isClickPlusBtn ? '0px' : '-230px',
      }}
      initial={{ bottom: '-230px' }}
      transition={easeInOut}
      className={`fixed flex flex-col left-1/2 transform -translate-x-1/2 w-full max-w-[440px] min-w-[330px] h-[280px] bg-white z-[9999]`}
    >
      <div className='w-full flex gap-[5px] bg-white items-center px-[10px] py-[10px]'>
        <button
          ref={props.plusBtnRef}
          onClick={() => {
            props.setIsClickPlusBtn((state) => !state);
          }}
        >
          <Image src='/chatting/plus.svg' alt='plus' width={30} height={30} />
        </button>
        <form className='flex-grow relative' onSubmit={handleSubmit}>
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className='w-full h-[30px] border-main-red border rounded-full pl-[20px] pr-[50px] py-[5px]'
          />
          <button
            type='submit'
            className='absolute right-[10px] top-1/2 transform -translate-y-1/2'
          >
            <Image src='/chatting/send.svg' alt='send' width={25} height={25} />
          </button>
        </form>
      </div>
      <div className='w-full flex-grow flex-wrap flex gap-[30px] justify-center items-center px-[30px] py-[20px]'>
        {funcBtn('camera', '카메라')}
        {funcBtn('image', '이미지')}
        {funcBtn('exchange', '실명전환')}
        {funcBtn('calendar', '대면신청')}
        {funcBtn('alert', '신고하기')}
        {funcBtn('logout', '나가기')}
      </div>
    </motion.nav>
  );
};

export default BottomInputNav;
