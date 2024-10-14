'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/react';

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
      alert('로그인 성공!');
      router.replace('/main/home');
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
            <Input
              type='email'
              variant='bordered'
              label='학교 이메일'
              value={email}
              onValueChange={setEmail}
              classNames={{
                inputWrapper: 'border border-solid border-slate-200',
              }}
            />
          </div>

          <div className='w-full flex flex-col items-end gap-[10px]'>
            <Input
              type='password'
              variant='bordered'
              label='비밀번호'
              value={password}
              onValueChange={setPassword}
              classNames={{
                inputWrapper: 'border border-solid border-slate-200',
              }}
            />
            <Link href={'#'} className='text-main-red text-subtitle'>
              비밀번호 찾기
            </Link>
          </div>

          <button
            type='submit'
            // onClick={handleLogin}
            className='w-full h-[50px] mt-[20px] full-btn'
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
