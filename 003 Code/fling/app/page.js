'use client';

import Link from 'next/link';
import EventCodeModal from './EventCodeModal';
import { useState } from 'react';
import Image from 'next/image';
import MainSlider from './MainSlider';
import InstallPrompt from './InstallPrompt';

const StartPage = () => {
  const [isEventCodeModalOpen, setIsEventCodeModalOpen] = useState(false);
  const [isClickInstallBtn, setIsClickInstallBtn] = useState(false);

  return (
    <div className='w-full h-screen px-[40px] relative'>
      <header className='absolute w-full h-[100px] flex justify-between items-center px-[30px] py-[25px] z-[9999] left-0'>
        <Image src='/main-logo.svg' alt='main-logo' width={100} height={50} />
        <div className='flex gap-[10px]'>
          <button
            onClick={() => setIsClickInstallBtn(true)}
            className={`${isClickInstallBtn ? 'hidden' : null} focus-btn px-[20px] h-[40px] text-info`}
          >
            인앱 설치
          </button>
          <button
            onClick={() => setIsEventCodeModalOpen(true)}
            className='focus-btn px-[20px] h-[40px] text-info'
          >
            코드 신청
          </button>
        </div>
      </header>

      <InstallPrompt
        isClickInstallBtn={isClickInstallBtn}
        setIsClickInstallBtn={setIsClickInstallBtn}
      />

      {isEventCodeModalOpen && (
        <EventCodeModal setIsEventCodeModalOpen={setIsEventCodeModalOpen} />
      )}

      <div className='size-full flex flex-col justify-center items-center relative'>
        <div className='w-full min-h-[300px] h-1/2 relative top-[-50px] flex flex-col justify-evenly items-center'>
          <MainSlider />
        </div>

        <div className='w-full absolute bottom-[50px]'>
          <button className='w-full h-[60px] my-[20px] rounded-[15px] bg-main-red text-white'>
            <Link
              href='/register/code'
              className='size-full flex justify-center items-center'
            >
              플링 시작하기
            </Link>
          </button>

          <div className='w-full flex justify-center text-subtitle'>
            <p>이미 계정이 있으신가요?</p>
            <Link className='ml-[10px] text-main-red' href={'/login'}>
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
