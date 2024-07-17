'use client';

import Link from 'next/link';
import CarouselComponent from './Carousel';
import EventCodeModal from './EventCodeModal';
import { useState } from 'react';

const StartPage = () => {
  const [isEventCodeModalOpen, setIsEventCodeModalOpen] = useState(false);

  // function isPageOverscrolled() {
  //   return (
  //     document.documentElement.scrollHeight >
  //     document.documentElement.clientHeight
  //   );
  // }

  return (
    <div className='w-full h-screen px-[40px] relative'>
      <header className='absolute w-full h-[100px] flex justify-between px-[30px] py-[25px] z-50 left-0'>
        <img src='/main-logo.svg' className='h-full' />
        {/* {isPageOverscrolled() ? 'yes' : 'no'} */}
        <button
          onClick={() => setIsEventCodeModalOpen(true)}
          className='focus-btn px-[20px] text-info'
        >
          코드 받기
        </button>
      </header>

      {isEventCodeModalOpen && (
        <EventCodeModal setIsEventCodeModalOpen={setIsEventCodeModalOpen} />
      )}

      <div className='size-full flex flex-col justify-center items-center relative'>
        <div className='w-full min-h-[300px] h-1/2 relative top-[-50px] flex flex-col justify-evenly items-center'>
          <CarouselComponent />
        </div>

        <div className='w-full absolute bottom-[50px]'>
          <button className='w-full h-[60px] my-[20px] rounded-[15px] bg-main-red text-white'>
            <Link
              href='/test/register'
              className='size-full flex justify-center items-center'
            >
              이벤트코드 입력하기
            </Link>
          </button>

          <div className='w-full flex justify-center text-subtitle'>
            <p>이미 계정이 있으신가요?</p>
            <Link className='ml-[10px] text-main-red' href={'#'}>
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
