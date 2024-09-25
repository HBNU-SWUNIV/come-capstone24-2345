'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    let res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res.status === 200) {
      alert('로그인 되었습니다');
      router.replace('/main');
    } else {
      alert(res.error);
    }
  };
  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='w-full h-full flex flex-col justify-center items-center gap-[20px]'>
        <Image src='/main-logo.svg' width={200} height={100} alt='main-logo' />

        <form
          className='w-full flex flex-col gap-[10px]'
          onSubmit={handleLogin}
        >
          <div className='w-full flex flex-col mt-[10px]'>
            <div className='relative w-full'>
              <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder=' '
                className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn'
              />

              <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
                아이디(학교 이메일)
              </label>
            </div>
          </div>

          <div className='w-full flex flex-col'>
            <div className='relative w-full'>
              <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder=' '
                className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn'
              />

              <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
                비밀번호
              </label>
              <Link
                href={'#'}
                className='absolute bottom-[-30px] right-0 text-main-red text-subtitle'
              >
                비밀번호 찾기
              </Link>
            </div>
          </div>

          <button
            type='submit'
            // onClick={handleLogin}
            className='w-full h-[60px] mt-[40px] full-btn'
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
