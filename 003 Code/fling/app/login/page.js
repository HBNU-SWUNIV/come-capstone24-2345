'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const clickLogin = async (e) => {
    e.preventDefault();

    let result = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
      // callbackUrl: '/main',
    });

    if (result.status == 200) {
      alert('로그인되었습니다');
      router.replace('/main');
    } else {
      alert(result.error);
    }
  };
  return (
    <div className='flex flex-col size-full items-center pt-[100px]'>
      <div className='w-full'>
        <div
          className='w-full h-[20%] text-end font-thin px-[20px]'
          style={{ fontSize: '30px', lineHeight: '50px' }}
        >
          <p>터치 단 한 번으로</p>
          <p>랜덤 소개팅</p>
          <div className='flex justify-end mt-[8px] font-medium items-center'>
            <img className='w-[50px] h-[50px] mr-[8px]' src='/logo.png' />
            <p>플링</p>
          </div>
        </div>
      </div>

      {/* <div className='w-[120%] h-[65%] flex relative items-center'>
        <img
          className='w-[100%] h-[100%] absolute left-[-7%]'
          src='/login.svg'
        />
      </div> */}

      <form
        onSubmit={clickLogin}
        method='POST'
        className='w-full h-full flex flex-col justify-center items-center box-content'
      >
        <div className='relative w-2/3 mb-[30px]'>
          <input
            onChange={handleEmail}
            value={email}
            type='email'
            placeholder=' '
            className='floating-label-input block w-full h-[50px] card rounded-full focus:outline-none px-[20px]'
          />
          <label className='floating-label absolute left-[20px] top-[15px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
            이메일
          </label>
        </div>
        <div className='relative w-2/3 mb-[30px]'>
          <input
            onChange={handlePassword}
            value={password}
            type='password'
            placeholder=' '
            className='floating-label-input block w-full h-[50px] card rounded-full focus:outline-none px-[20px]'
          />
          <label className='floating-label absolute left-[20px] top-[15px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
            비밀번호
          </label>
        </div>
        <button
          className='card-light flex w-2/3 h-[50px] bg-main-pink/70 rounded-full text-start text-white justify-center items-center box-border ml-[8px]'
          type='submit'
          style={{ fontSize: '12px' }}
        >
          <a href='/main'>로그인</a>
        </button>
      </form>
    </div>
  );
}
