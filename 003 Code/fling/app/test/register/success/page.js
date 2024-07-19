'use client';

import JSConfetti from 'js-confetti';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const RegisterSuccess = () => {
  const confettiRef = useRef();

  const registerUserInfo = useSelector((state) => state.registerUserInfo);

  const router = useRouter();

  useEffect(() => {
    const jsConfetti = new JSConfetti(confettiRef.current);
    if (confettiRef.current) {
      jsConfetti.addConfetti({
        // emojis: ['❤️', '🌟', '💥', '✨', '🫧'],
        confettiNumber: 150,
        emojiSize: 40,
        confettiColors: [
          '#5D35FF', // purple
          '#FFD600', // yellow
          '#E94057', // red
          '#0047FF', // blue
          '#20E200', // green
        ],
      });

      return () => {
        jsConfetti.clearCanvas();
        jsConfetti.destroyCanvas();
      };
    }
  }, [confettiRef]);

  const handleLoginBtn = () => {
    router.replace('/test/login');
  };

  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col justify-center items-center'>
        <div
          className='w-full flex flex-col justify-center items-center gap-[20px]'
          ref={confettiRef}
        >
          <img src='/main-logo.svg' className='w-[150px]' />
          <span className='text-title'>회원가입 완료!</span>
          {/* <p className='text-subtitle'>플링 회원이 되신 것을 축하드려요!</p> */}
          <div className='flex flex-col gap-[4px] text-info opacity-70'>
            <p>회원님께서 입력하셨던 정보는</p>
            <p>마이페이지에서 수정할 수 있어요</p>
          </div>
          <button
            className='w-auto h-[60px] px-[60px] mt-[20px] full-btn'
            onClick={handleLoginBtn}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
