'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import React, { useRef, useState } from 'react';

const EventCodeModal = (props) => {
  const [email, setEmail] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const modalRef = useRef();

  useOnClickOutside(modalRef, () => {
    props.setIsEventCodeModalOpen(false);
  });

  const handleSubmit = () => {
    setIsSubmit(true);
  };
  return (
    <div className='absolute left-0 z-[999] w-full h-screen bg-black/50 flex justify-center items-center'>
      <div
        ref={modalRef}
        className='w-[85%] h-3/4 bg-white rounded-[15px] p-[20px] flex flex-col justify-between gap-[20px]'
      >
        {!isSubmit ? (
          <>
            <p>플링에 오신 것을 환영해요</p>
            <div className='text-subtitle text-start flex flex-col gap-[5px] text-black/70'>
              <p>이벤트 코드를 받은 분만 가입이 가능</p>
              <p>선정 인원은 랜덤</p>
              <p>
                대상자 선정은 <u>매주 월요일 오전 9시</u>에 진행
              </p>
              <p>
                코드는 <u>매주 월요일 오전 9시 10분</u>에 일괄 전송
              </p>
            </div>
            <div className='flex flex-col gap-[20px]'>
              <div className='relative w-full'>
                <input
                  placeholder=' '
                  type='email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  // maxLength={8}
                  className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn'
                />

                <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
                  코드 받을 이메일
                </label>
              </div>
              <button
                onClick={handleSubmit}
                className={`w-full h-[60px] ${email === '' ? 'disabled-btn' : 'full-btn'}`}
              >
                제출
              </button>
            </div>
          </>
        ) : (
          <div>제출됨요</div>
        )}
      </div>
    </div>
  );
};

export default EventCodeModal;
