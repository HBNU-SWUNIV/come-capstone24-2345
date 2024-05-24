'use client';

import Image from 'next/image';
import plus from '@/public/plus.svg';
import send from '@/public/send.svg';

import camera from '@/public/camera.svg';
import photo from '@/public/photo.svg';
import exchange from '@/public/exchange.svg';
import calendar from '@/public/calendar.svg';
import megaphone from '@/public/megaphone.svg';
import chatout from '@/public/logout.svg';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ChatRoomLayout = ({ children }) => {
  const router = useRouter();

  const handleClickPlus = () => {
    document
      .querySelector('#chat-input')
      .classList.toggle('translate-y-[350px]');
  };
  return (
    <div className='w-full relative'>
      <header className='max-w-[440px] w-full mx-auto h-[60px] bg-[#f6ebfe] fixed top-0 flex items-center z-50'>
        <div className='w-[15%] h-[50%] flex items-center justify-center'>
          <img
            className='h-[80%] aspect-square cursor-pointer'
            src='/direction/chevron-left.svg'
            onClick={() => {
              router.back();
            }}
          />
        </div>

        <div className='w-[70%] h-[50%] flex items-center justify-start'>
          <span className='text-xl ml-[8px]'>👩🏻‍🎓 닉네임 님</span>
        </div>

        <div className='w-[15%] h-[50%] flex items-center'>
          <span>D+</span>
          <span>7</span>
        </div>
      </header>

      <main className='w-full h-auto pt-[60px] pb-[120px] px-[20px]'>
        <div className='w-full flex flex-col items-center'>{children}</div>
      </main>

      <nav
        id='chat-input'
        className='max-w-[440px] w-full mx-auto h-[400px] fixed bottom-0 px-[10px] flex flex-col justify-center card translate-y-[350px]'
      >
        <div className='w-full h-[50px] mb-[20px] pr-[5px] flex items-center'>
          <button className='size-[40px] mr-[8px]' onClick={handleClickPlus}>
            <Image className='size-full' src={plus} alt='plus' />
          </button>
          <form className='w-full h-[40px] relative'>
            <input className='size-full card rounded-full pl-[20px] pr-[45px]' />
            <button
              className='size-[30px] absolute top-[5px] right-[10px]'
              type='submit'
            >
              <Image className='size-full' src={send} alt='send' />
            </button>
          </form>
        </div>

        <div className='w-full flex flex-grow flex-col pb-[20px]'>
          <div className='w-full h-1/2 flex justify-evenly'>
            <div className='flex flex-col justify-center'>
              <Image
                className='size-[40px] box-content p-[20px] card rounded-[20px] mb-[16px]'
                src={camera}
                alt='camera'
              />
              <span>카메라</span>
            </div>
            <div className='flex flex-col justify-center'>
              <Image
                className='size-[40px] box-content p-[20px] card rounded-[20px] mb-[16px]'
                src={photo}
                alt='photo'
              />
              <span>사진</span>
            </div>
            <div className='flex flex-col justify-center'>
              <Image
                className='size-[40px] box-content p-[20px] card rounded-[20px] mb-[16px]'
                src={exchange}
                alt='exchange'
              />
              <span>실명전환</span>
            </div>
          </div>

          <div className='w-full h-1/2 flex justify-evenly'>
            <div className='flex flex-col justify-center'>
              <Image
                className='size-[40px] box-content p-[20px] card rounded-[20px] mb-[16px]'
                src={calendar}
                alt='calendar'
              />
              <span>대면신청</span>
            </div>
            <div className='flex flex-col justify-center'>
              <Image
                className='size-[40px] box-content p-[20px] card rounded-[20px] mb-[16px]'
                src={megaphone}
                alt='megaphone'
              />
              <span>신고하기</span>
            </div>
            <div className='flex flex-col justify-center'>
              <Image
                className='size-[40px] box-content p-[20px] card rounded-[20px] mb-[16px]'
                src={chatout}
                alt='chatout'
              />
              <span>나가기</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ChatRoomLayout;
