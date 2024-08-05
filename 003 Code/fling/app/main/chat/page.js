'use client';

import Image from 'next/image';
import React from 'react';
import HobbySlider from './HobbySlider';
import BottomNav from '../BottomNav';

const ChatPage = () => {
  return (
    <div className='w-full h-full px-[40px] relative'>
      <div className='w-full flex'>
        <div className='w-full mt-[120px] text-start flex flex-col gap-[20px] pb-[100px]'>
          <span className='text-title'>닉네임 님</span>

          <div className='w-full flex gap-[20px]'>
            <div className='size-[100px] focus-btn'></div>
            <div className='flex-grow flex flex-col justify-between'>
              <div className='flex gap-[10px] items-center'>
                <Image
                  src='/main/chat/ruler.svg'
                  width={25}
                  height={25}
                  alt='ruler'
                />
                <span className='text-subtitle font-bold text-main-red opacity-80'>
                  183 cm
                </span>
              </div>
              <div className='flex gap-[10px] items-center'>
                <Image
                  src='/main/chat/alcohol.svg'
                  width={25}
                  height={25}
                  alt='alcohol'
                />
                <span className='text-subtitle font-bold text-main-red opacity-80'>
                  3 병
                </span>
              </div>
              <div className='flex gap-[10px] items-center'>
                <Image
                  src='/main/chat/smoking.svg'
                  width={25}
                  height={25}
                  alt='smoking'
                />
                <span className='text-subtitle font-bold text-main-red opacity-80'>
                  비흡연자
                </span>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-col gap-[10px]'>
            <span className='text-subtitle font-bold text-main-red'>
              한 줄 소개
            </span>
            <p className='text-info opacity-80'>
              안녕하세요 닉네임이라고 하는 사람입니다.
            </p>
          </div>

          <div className='w-full flex flex-col gap-[10px]'>
            <span className='text-subtitle font-bold text-main-red'>ISFP</span>
            <p className='text-info opacity-80'>
              말없이 다정하고 온화하며, 사람들에게 친절한 유형이에요 상대방을 잘
              알게 될 때까진 내면을 보여주지 않아요 사람과 관계되는 일을 할 때
              감정에 지나치게 세심하고 민감한 경향이 있어요
            </p>
          </div>

          <div className='w-full flex flex-col gap-[10px]'>
            <span className='text-subtitle font-bold text-main-red'>
              로맨틱한 연애추구
            </span>
            <p className='text-info opacity-80'>
              감정 표현이 풍부하고 상대방을 특별하게 대하는 것을 중요시해요
            </p>
          </div>

          <div className='w-full flex flex-col gap-[10px]'>
            <span className='text-subtitle font-bold text-main-red'>취미</span>
            <HobbySlider />
          </div>

          <div className='w-full flex flex-col gap-[10px]'>
            <span className='text-subtitle font-bold text-main-red'>성격</span>
            <p className='text-info opacity-80'>
              안녕하세요 닉네임이라고 하는 사람입니다.
            </p>
          </div>

          <div className='w-full flex flex-col items-center gap-[20px]'>
            <p>
              <span>닉네임님과 성격이 </span>
              <u className='font-bold text-main-red'>87%</u>
              <span> 유사해요</span>
            </p>
            <button className='flex gap-[4px] justify-between items-center full-btn px-[30px] py-[10px]'>
              <p>대화하기</p>
              <Image
                src={'/direction/chevron-right.svg'}
                width={15}
                height={15}
              />
            </button>
          </div>
        </div>
      </div>
      {/* <BottomNav /> */}
    </div>
  );
};

export default ChatPage;
