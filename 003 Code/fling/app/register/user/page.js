'use client';

import { setGlobalBirth, setGlobalName } from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const RegisterUser = () => {
  let [userName, setUserName] = useState('');
  let [userBirth, setUserBirth] = useState('');

  const dispatch = useDispatch();
  const globalUserInfo = useSelector((state) => state.registerUserInfo);

  let router = useRouter();

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleUserBirth = (e) => {
    setUserBirth(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/check/userInfo', { userName, userBirth })
      .then((result) => {
        // console.log(result.data);
        dispatch(setGlobalName(result.data.userName));
        dispatch(setGlobalBirth(result.data.userBirth));
        console.log('/register/user : ' + JSON.stringify(globalUserInfo));
        router.push('/register/univ');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={20}
        min={0}
        max={100}
      ></progress>
      <form
        className='size-full flex flex-col'
        onSubmit={handleSubmit}
        method='POST'
      >
        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          회원님의 이름과 생년월일을 적어주세요
        </span>

        <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
          <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
            이름
          </span>
          <input
            onChange={handleUserName}
            autoComplete='off'
            autoFocus={true}
            value={userName}
            placeholder='홍길동'
            className='bg-transparent'
          />
        </div>

        <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
          <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
            생년월일
          </span>
          <input
            onChange={handleUserBirth}
            // inputMode='numeric'
            type='date'
            value={userBirth}
            autoComplete='off'
            placeholder='19990101'
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

export default RegisterUser;
