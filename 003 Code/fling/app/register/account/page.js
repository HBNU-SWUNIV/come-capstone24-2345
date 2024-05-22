'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Fourth = (props) => {
  const router = useRouter();
  let [clickDup, setClickDup] = useState(false);
  let [checkDup, setCheckDup] = useState(false);

  useEffect(() => {
    if (clickDup) {
      if (false) {
        setCheckDup(false);
      } else {
        setCheckDup(true);
      }
    }
  }, [clickDup]);

  return (
    <>
      <div className='size-full flex flex-col p-[20px]'>
        <progress
          className='w-full mb-[20px]'
          value={60}
          min={0}
          max={100}
        ></progress>
        <span className='text-start mb-[20px]' style={{ fontSize: '22px' }}>
          계정 생성
        </span>
        <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
          <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
            닉네임
          </span>
          <input placeholder='홍길동전' className='bg-transparent' />
        </div>

        {clickDup ? (
          checkDup ? (
            <span
              className='text-start pl-[20px] mb-[20px]'
              style={{ fontSize: '12px' }}
            >
              사용가능한 닉네임입니다
            </span>
          ) : (
            <span
              className='text-start pl-[20px] mb-[20px]'
              style={{ fontSize: '12px' }}
            >
              이미 사용중인 닉네임입니다
            </span>
          )
        ) : null}

        <button
          className='btn p-[20px] mb-[20px]'
          onClick={() => {
            setClickDup(true);
          }}
        >
          중복 확인
        </button>

        {checkDup ? (
          <>
            <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
              <span
                className='text-start mb-[16px]'
                style={{ fontSize: '14px' }}
              >
                아이디
              </span>
              <input value='example@school.ac.kr' className='bg-transparent' />
            </div>

            <div
              className='flex flex-col pl-[20px] mb-[20px] text-start'
              style={{ fontSize: '12px' }}
            >
              <span>아이디는 학교 이메일을 사용합니다</span>
            </div>

            <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
              <span
                className='text-start mb-[16px]'
                style={{ fontSize: '14px' }}
              >
                비밀번호
              </span>
              <input
                placeholder='********'
                className='bg-transparent'
                type='password'
              />
            </div>

            <div
              className='flex flex-col pl-[20px] mb-[20px] text-start'
              style={{ fontSize: '12px' }}
            >
              <span className=' mb-[8px]'>
                숫자, 특수기호를 최소 하나 이상 조합
              </span>
              <span>비밀번호는 최소 8자 이상</span>
            </div>

            <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
              <span
                className='text-start mb-[16px]'
                style={{ fontSize: '14px' }}
              >
                비밀번호 재입력
              </span>
              <input
                placeholder='********'
                className='bg-transparent'
                type='password'
              />
            </div>
            <button
              className='btn p-[20px] mb-[20px]'
              onClick={() => {
                router.push('/register/photo');
              }}
            >
              확인
            </button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Fourth;
