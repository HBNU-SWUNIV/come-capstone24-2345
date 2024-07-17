'use client';

import { setGlobalIntroduction } from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterIntoduction = () => {
  let [introduction, setIntroduction] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const handleIntroduction = (e) => {
    setIntroduction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post('/api/check/introduction', { introduction })
      .then((result) => {
        dispatch(setGlobalIntroduction(result.data.introduction));
        router.push('/register/success');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={100}
        min={0}
        max={100}
      ></progress>
      <form
        className='size-full flex flex-col'
        onSubmit={handleSubmit}
        method='POST'
      >
        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          마지막으로 회원님의 한 줄 소개
        </span>

        <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
          <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
            자유롭게 작성해주세요
          </span>
          <input
            onChange={handleIntroduction}
            autoComplete='off'
            autoFocus={true}
            // value={userName}
            placeholder='ex) 잘생긴게 죄라면 전 무기징역입니다'
            className='bg-transparent'
          />
        </div>

        <button type='submit' className='btn p-[20px] rounded-full'>
          다음
        </button>
      </form>
    </>
  );
};

export default RegisterIntoduction;
