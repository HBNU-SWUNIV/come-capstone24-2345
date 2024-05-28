'use client';

import { setGlobalGender } from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterGender = () => {
  let [gender, setGender] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const clickManBtnHandler = (e) => {
    e.preventDefault();
    setGender('man');
  };
  const clickWomanBtnHandler = (e) => {
    e.preventDefault();
    setGender('woman');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/check/gender', { gender })
      .then((result) => {
        dispatch(setGlobalGender(result.data));
        router.push('/register/user');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={17}
        min={0}
        max={100}
      ></progress>

      <form
        className='size-full flex flex-col'
        onSubmit={handleSubmit}
        method='POST'
      >
        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          회원님의 성별을 선택해 주세요
        </span>

        <div className='w-full flex mb-[20px] gap-[20px]'>
          <div className='w-1/2 aspect-square'>
            <span>남학생</span>
            <button
              className={`w-full card rounded-[20px] mt-[20px] ${gender == 'man' ? 'border-[2px] border-[var(--main-puple)]' : null}`}
              onClick={clickManBtnHandler}
            >
              <label htmlFor='man' className='block size-full cursor-pointer'>
                <img className='size-full' src='/man.svg' alt='man' />
                <input
                  // onChange={handleUserName}
                  id='man'
                  type='radio'
                  className='hidden'
                />
              </label>
            </button>
          </div>

          <div className='w-1/2 aspect-square'>
            <span>여학생</span>
            <button
              className={`w-full card rounded-[20px] mt-[20px] ${gender == 'woman' ? 'border-[2px] border-[var(--main-puple)]' : null}`}
              onClick={clickWomanBtnHandler}
            >
              <label htmlFor='woman' className='block size-full cursor-pointer'>
                <img className='size-full' src='/woman.svg' alt='woman' />
                <input
                  // onChange={handleUserName}
                  id='woman'
                  type='radio'
                  className='hidden'
                />
              </label>
            </button>
          </div>
        </div>

        <button type='submit' className='btn p-[20px] rounded-full'>
          다음
        </button>
      </form>
    </>
  );
};

export default RegisterGender;
