'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Divider } from '@nextui-org/react';
import axios from 'axios';

const ChatPage = () => {
  const { data: session, status } = useSession();
  const date = new Date();

  const [sessionInfo, setSessionInfo] = useState(null);
  const [chatroomID, setChatroomID] = useState();

  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      setSessionInfo(session.user);
    }
  }, [session, status]);

  useEffect(() => {
    let fetchChatroomID = async () => {
      await axios
        .post('/api/chat/roomID', { email: sessionInfo.email })
        .then((res) => {
          setChatroomID(res.data.chatroomID);
        });
    };

    if (sessionInfo) {
      fetchChatroomID();
    }
  }, [sessionInfo]);

  useEffect(() => {
    chatroomID && console.log(chatroomID);
  }, [chatroomID]);

  const infoComponent = (key, value) => {
    return (
      <div className='flex'>
        <span className='text-subtitle text-gray-700 flex-1 text-start'>
          {key}
        </span>
        <div className='text-subtitle w-[75%] text-start'>{value}</div>
      </div>
    );
  };

  const handleGoToChatroom = () => {
    if (chatroomID) {
      router.replace(`/chatroom/${chatroomID}`);
    } else {
      alert('잠시 후 다시 시도해주세요');
    }
  };

  if (sessionInfo) {
    return (
      <div className='w-full h-fit bg-gray-100 px-[40px]'>
        <div className='size-full flex flex-col gap-[20px] items-center pt-[230px]'>
          <div className='absolute top-[60px] w-full bg-white flex flex-col gap-[10px] px-[40px] py-[20px]'>
            <div className='w-full flex gap-[20px]'>
              <div className='size-[100px] bg-black text-white rounded-full'>
                이미지
              </div>
              <div className='text-start flex flex-col justify-around'>
                <div className='flex gap-[5px]'>
                  <span>{sessionInfo.nickname}님</span>
                  <span>
                    {date.getFullYear() - sessionInfo.birth.year + 1}살
                  </span>
                </div>
                <div className='h-fit flex gap-[5px] text-subtitle text-gray-500'>
                  <span>{sessionInfo.univ}</span>
                  <Divider orientation='vertical' />
                  <span>{sessionInfo.department}</span>
                </div>
                <div className='w-full h-[20px] flex items-center gap-[5px]'>
                  <div className='size-[20px] relative'>
                    <Image
                      src={`/main/mypage/check-${sessionInfo.univCert.toString()}.svg`}
                      fill
                      alt={`check-${sessionInfo.univCert.toString()}`}
                    />
                  </div>
                  <span
                    className={
                      sessionInfo.univCert ? 'text-[#4ECB71]' : 'text-main-red'
                    }
                  >
                    {sessionInfo.univCert ? '대학인증 완료' : '대학인증 미완료'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px]'>
            <button
              className='focus-btn px-[20px] py-[10px]'
              onClick={handleGoToChatroom}
            >
              채팅방 이동
            </button>
            <div className='w-full flex justify-between items-center'>
              <span>나의 정보</span>
              <button
                className='flex gap-[5px] px-[10px] py-[5px] justify-center items-center btn'
                onClick={() => router.replace('/main/mypage/edit/myinfo')}
              >
                <Image
                  src='/main/mypage/pencil.svg'
                  width={15}
                  height={15}
                  alt='수정'
                />
                <span className='text-info'>수정</span>
              </button>
            </div>
            <div className='flex flex-col gap-[10px]'>
              {infoComponent('학교', sessionInfo.univ)}
              {infoComponent('학과', sessionInfo.department)}
              {infoComponent('키', `${sessionInfo.height}cm`)}
              {infoComponent('종교', '무교')}
              {infoComponent('MBTI', sessionInfo.mbti.join(''))}
              {infoComponent(
                '흡연/음주',
                `${sessionInfo.smoking === 'smoking' ? '흡연자' : '비흡연자'} / ${sessionInfo.drinkLimit === 0 ? '술을 못하는 편' : `${sessionInfo.drinkLimit}병 정도`}`
              )}
              {infoComponent(
                '군필여부',
                `${sessionInfo.army ? '군필자' : '미필자'}`
              )}
            </div>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px]'>
            <div className='w-full flex justify-between items-center'>
              <span>한 줄 소개</span>
              <button
                className='flex gap-[5px] px-[10px] py-[5px] justify-center items-center btn'
                onClick={() => router.replace('/main/mypage/edit/myintro')}
              >
                <Image
                  src='/main/mypage/pencil.svg'
                  width={15}
                  height={15}
                  alt='수정'
                />
                <span className='text-info'>수정</span>
              </button>
            </div>
            <span className='text-subtitle text-start'>
              {sessionInfo.introduction}
            </span>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px]'>
            <div className='w-full flex justify-between items-center'>
              <span>연애 유형</span>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <span className='text-subtitle text-start'>
                {sessionInfo.datingType.type}
              </span>
              <span className='text-info text-start'>
                {sessionInfo.datingType.description}
              </span>
            </div>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px]'>
            <div className='w-full flex justify-between items-center'>
              <span>취미</span>
              <button
                className='flex gap-[5px] px-[10px] py-[5px] justify-center items-center btn'
                onClick={() => router.replace('/main/mypage/edit/myhobby')}
              >
                <Image
                  src='/main/mypage/pencil.svg'
                  width={15}
                  height={15}
                  alt='수정'
                />
                <span className='text-info'>수정</span>
              </button>
            </div>
            <div className='text-subtitle text-start w-full flex flex-wrap gap-[5px]'>
              {sessionInfo.hobby.map((hobby) => {
                return (
                  <button
                    key={hobby}
                    className={`flex justify-center items-center gap-[5px] px-[12px] py-[8px] btn`}
                  >
                    <Image
                      src={`/register/hobby/unchecked/${hobby[1]}.svg`}
                      alt={hobby[1]}
                      width={20}
                      height={20}
                    />
                    <span>{hobby[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='w-full h-[100px]'></div>
        </div>
      </div>
    );
  }
};

export default ChatPage;
