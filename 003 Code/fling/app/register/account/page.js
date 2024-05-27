'use client';

import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterAccount = () => {
  let [nickname, setNickname] = useState('');
  let [isExistNickname, setIsExistNickname] = useState(true);
  let [password, setPassword] = useState('');
  let [reEnterPassword, setReEnterPassword] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleReEnterPassword = (e) => {
    setReEnterPassword(e.target.value);
  };

  const checkNickname = async (e) => {
    e.preventDefault();
    await axios
      .get(`/api/check/nickname?nickname=${nickname}`)
      .then((res) => {
        console.log(res.data);
        setIsExistNickname(false);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const checkPassword = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/check/password', {
        password,
        reEnterPassword,
        email: searchParams.get('email'),
      })
      .then((res) => {
        router.push('/register/photo');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={60}
        min={0}
        max={100}
      ></progress>
      <div className='size-full flex flex-col'>
        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          계정 생성
        </span>
        <form onSubmit={checkNickname}>
          <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
            <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
              닉네임
            </span>
            <input
              onChange={handleNickname}
              value={nickname}
              placeholder='홍길동전'
              className='bg-transparent'
            />
          </div>

          {isExistNickname == false && (
            <p
              className='text-start pl-[20px] mb-[20px]'
              style={{ fontSize: '12px' }}
            >
              사용가능한 닉네임입니다
            </p>
          )}

          <button className='w-full btn p-[20px] mb-[20px]' type='submit'>
            중복 확인
          </button>
        </form>

        {isExistNickname == false && (
          <form onSubmit={checkPassword}>
            <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
              <span
                className='text-start mb-[16px]'
                style={{ fontSize: '14px' }}
              >
                아이디
              </span>
              <input
                value={searchParams.get('email')}
                className='bg-transparent'
                disabled
              />
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
                onChange={handlePassword}
                value={password}
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
                onChange={handleReEnterPassword}
                value={reEnterPassword}
                placeholder='********'
                className='bg-transparent'
                type='password'
              />
            </div>
            <button className='w-full btn p-[20px] mb-[20px]' type='submit'>
              확인
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default RegisterAccount;
