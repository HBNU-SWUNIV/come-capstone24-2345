'use client';

import { setGlobalEventCode } from '@/lib/store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const CodePage = () => {
  const [code, setCode] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleNext = () => {
    // DB에서 이번주 선정자들에 속하는지 확인 후 맞으면 아래코드 진행
    dispatch(setGlobalEventCode(code));
    router.replace('/register');
  };
  return (
    <div className='w-full h-screen px-[40px] relative overflow-y-scroll'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-start'>
          <span className='text-title'>시작하기 앞서</span>
          <div className='text-subtitle my-[10px] opacity-70'>
            <p>이메일로 받으신</p>
            <p>코드를 입력해주세요</p>
          </div>
          <div className='text-subtitle my-[10px] opacity-70 text-main-red'>
            <p>코드는 메인화면 상단에서 받으실 수 있습니다</p>
          </div>
        </div>

        <div className='w-full mt-[20px] flex flex-col gap-[20px]'>
          <div className='relative w-full'>
            <input
              onChange={handleCode}
              placeholder=' '
              className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn'
            />
            <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
              코드입력
            </label>
          </div>
        </div>

        <div className='absolute bottom-[50px] w-[calc(100%_-_80px)]'>
          <button
            onClick={handleNext}
            className={`w-full h-[60px] my-[20px] ${code === '' ? 'disabled-btn' : 'full-btn'}`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
