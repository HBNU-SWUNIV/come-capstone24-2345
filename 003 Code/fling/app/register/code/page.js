'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import {
  setStoreChatroomID,
  setStoreEmail,
  setStoreEventCode,
  setStoreGender,
} from '../../../library/store';

const CodePage = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const userEmail = useSelector((state) => state.registerUserInfo.email);
  const userEventCode = useSelector(
    (state) => state.registerUserInfo.eventCode
  );
  const userGender = useSelector((state) => state.registerUserInfo.gender);
  const userChatroomID = useSelector(
    (state) => state.registerUserInfo.chatroomID
  );

  useEffect(() => {
    if (userEmail && userEventCode && userGender && userChatroomID) {
      router.replace('/register/email');
    }
  }, [userEmail, userEventCode, userGender, userChatroomID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code === '') {
      alert('코드를 입력해주세요');
    } else {
      try {
        const result = await axios.post('/api/register/eventCode', { code });
        setIsLoading(true);
        dispatch(setStoreEmail(result.data.user.email));
        dispatch(setStoreEventCode(result.data.user.eventCode));
        dispatch(setStoreGender(result.data.user.gender));
        dispatch(setStoreChatroomID(result.data.chatroomID));
      } catch (err) {
        alert(err.response.data);
      }
    }
  };
  return (
    <div className='w-full h-screen px-[40px] pt-[80px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='text-start w-3/5 flex flex-col gap-[10px]'>
          <p className='text-title text-main-red'>시작하기 앞서</p>
          <p className='text-subtitle break-keep text-gray-500'>
            이메일로 받으신 이벤트코드를 입력해주세요
          </p>
        </div>

        <form id='event-code' onSubmit={handleSubmit}>
          <Input
            variant='bordered'
            label='코드 입력'
            description='대/소문자 정확하게 구분하여 기입해주세요'
            value={code}
            onValueChange={setCode}
            classNames={{
              inputWrapper: 'border border-solid border-slate-200',
              description: 'text-start',
            }}
          />
        </form>

        <label htmlFor='event-code'>
          <button
            onClick={(e) => handleSubmit(e)}
            type='submit'
            disabled={code !== '' ? false : true}
            className={`absolute bottom-[40px] left-0 ${code !== '' ? 'full-btn' : 'btn'} w-full h-[50px] content-center`}
          >
            {isLoading ? '확인중...' : '다음'}
          </button>
        </label>
      </div>
    </div>
  );
};

export default CodePage;
