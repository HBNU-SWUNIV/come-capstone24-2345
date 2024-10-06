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
  const [otherUserInfo, setOtherUserInfo] = useState(null);
  const [otherUserImg, setOtherUserImg] = useState();
  const [chatroomID, setChatroomID] = useState();

  const router = useRouter();

  const fetchOtherUserImg = async () => {
    if (otherUserInfo.email) {
      await axios
        .post('/api/chat/profileImg', { email: otherUserInfo.email })
        .then((res) => {
          setOtherUserImg(res.data);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setSessionInfo(session.user);
    }
  }, [session, status]);

  useEffect(() => {
    const fetchChatroomID = async () => {
      await axios
        .post('/api/chat/roomID', { email: sessionInfo.email })
        .then((res) => {
          setChatroomID(res.data.chatroomID);
        });
    };

    const fetchOtherUserInfo = async () => {
      await axios
        .post('/api/group/otherUserInfo', { email: sessionInfo.email })
        .then((res) => {
          setOtherUserInfo(res.data);
        });
    };

    if (sessionInfo) {
      fetchChatroomID();
      if (otherUserInfo === null) {
        fetchOtherUserInfo();
      }
    }
  }, [sessionInfo]);

  useEffect(() => {
    if (otherUserInfo) {
      fetchOtherUserImg();
    }
  }, [otherUserInfo]);

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

  if (otherUserInfo) {
    return (
      <div className='w-full h-fit bg-gray-50 px-[40px]'>
        <div className='size-full flex flex-col gap-[20px] items-center pt-[230px]'>
          <div className='absolute top-0 pt-[80px] w-full bg-white flex flex-col gap-[10px] px-[40px] py-[20px] border-b border-solid border-slate-200'>
            <div className='w-full flex gap-[20px]'>
              <div className='size-[100px] card-border text-white rounded-medium relative'>
                {otherUserImg ? (
                  <Image
                    src={otherUserImg}
                    alt='profile'
                    fill
                    className='rounded-large p-[3px] size-full'
                  />
                ) : null}
              </div>
              <div className='text-start flex flex-col justify-around'>
                <div className='flex h-fit gap-[10px]'>
                  <span>{otherUserInfo.nickname}님</span>
                  <Divider orientation='vertical' />
                  <span>
                    {date.getFullYear() - otherUserInfo.birth.year + 1}살
                  </span>
                </div>
                <div className='h-fit flex gap-[5px] text-subtitle text-gray-500'>
                  <span>{otherUserInfo.univ}</span>
                  <span>{otherUserInfo.department}</span>
                </div>
                <div className='w-full h-[20px] flex items-center gap-[10px]'>
                  <div className='size-[18px] relative'>
                    <Image
                      src={`/main/mypage/check-${otherUserInfo.univCert.toString()}.svg`}
                      fill
                      alt={`check-${otherUserInfo.univCert.toString()}`}
                    />
                  </div>
                  <span
                    className={
                      otherUserInfo.univCert
                        ? 'text-[#4ECB71]'
                        : 'text-main-red'
                    }
                  >
                    {otherUserInfo.univCert
                      ? '대학인증 완료'
                      : '대학인증 미완료'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px] card-border'>
            <div className='w-full flex justify-between items-center'>
              <span>{otherUserInfo.nickname}님의 정보</span>
            </div>
            <div className='flex flex-col gap-[10px]'>
              {infoComponent('학교', otherUserInfo.univ)}
              {infoComponent('학과', otherUserInfo.department)}
              {infoComponent('키', `${otherUserInfo.height}cm`)}
              {infoComponent('종교', otherUserInfo.religion)}
              {infoComponent('MBTI', otherUserInfo.mbti.join(''))}
              {infoComponent(
                '흡연/음주',
                `${otherUserInfo.smoking ? '흡연자' : '비흡연자'} / ${otherUserInfo.drinkLimit === 0 ? '술을 못하는 편' : `${otherUserInfo.drinkLimit}병 정도`}`
              )}
              {infoComponent(
                '군필여부',
                `${otherUserInfo.army ? '군필자' : '미필자'}`
              )}
            </div>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px] card-border'>
            <div className='w-full flex justify-between items-center'>
              <span>{otherUserInfo.nickname}님의 한 줄 소개</span>
            </div>
            <span className='text-subtitle text-start break-keep'>
              {otherUserInfo.introduction}
            </span>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px] card-border'>
            <div className='w-full flex justify-between items-center'>
              <span>{otherUserInfo.nickname}님의 연애 유형</span>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <span className='text-subtitle text-start'>
                {otherUserInfo.datingType.type}
              </span>
              <span className='text-info text-start break-keep'>
                {otherUserInfo.datingType.description}
              </span>
            </div>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px] card-border'>
            <div className='w-full flex justify-between items-center'>
              <span>{otherUserInfo.nickname}님의 취미</span>
            </div>
            <div className='text-subtitle text-start w-full flex flex-wrap gap-[5px]'>
              {otherUserInfo.hobby.map((hobby) => {
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

          <button
            className='full-btn w-full px-[20px] py-[10px]'
            onClick={handleGoToChatroom}
          >
            채팅방 이동
          </button>

          <div className='w-full h-[100px]'></div>
        </div>
      </div>
    );
  }
};

export default ChatPage;
