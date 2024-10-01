'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const editMyHobby = () => {
  const [info, setInfo] = useState();
  const [defaultInfo, setDefaultInfo] = useState();
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const hobbys = [
    ['영화', 'movie'],
    ['독서', 'book'],
    ['여행', 'travel'],
    ['등산', 'mountain'],
    ['전시회/박물관', 'museum'],
    ['헬스/필라테스', 'muscle'],
    ['수영', 'swim'],
    ['봉사활동', 'volunteer'],
    ['요리', 'cooking'],
    ['원예', 'flower'],
    ['러닝', 'running'],
    ['노래', 'microphone'],
    ['사이클', 'cycle'],
    ['미술', 'pallet'],
    ['사진촬영', 'camera'],
    ['캠핑', 'camping'],
    ['테니스', 'tennis'],
    ['스키/보드', 'ski'],
    ['낚시', 'fishing'],
    ['게임', 'game'],
    ['볼링', 'bowling'],
    ['음주', 'wine'],
    ['당구', 'billiards'],
    ['탁구', 'table-tennis'],
    ['농구', 'basketball'],
    ['야구', 'baseball'],
    ['축구', 'soccer'],
  ];

  useEffect(() => {
    if (status === 'authenticated') {
      let myinfo = {
        univ: session.user.univ,
        department: session.user.department,
        hobby: session.user.hobby,
      };
      setInfo(myinfo);
      setDefaultInfo(session.user);
    }
  }, [session, status]);

  if (info) {
    let isExist = (arr) => {
      if (Array.isArray(info.hobby)) {
        return info.hobby.some(
          (element) => JSON.stringify(element) === JSON.stringify(arr)
        );
      }
    };

    const handleHobbyButton = (arr) => {
      if (isExist(arr)) {
        setInfo((prev) => ({
          ...prev,
          hobby: prev.hobby.filter(
            (item) => JSON.stringify(item) !== JSON.stringify(arr)
          ),
        }));
      } else {
        setInfo((prev) => ({ ...prev, hobby: [...prev.hobby, arr] }));
      }
    };

    const handleEditInfo = async () => {
      await axios
        .post('/api/edit/myhobby', { defaultInfo, info })
        .then((res) => {
          alert('수정되었습니다!');
          update({ ...res.data.defaultInfo, ...res.data.modifyInfo });
          router.replace('/main/mypage');
        })
        .catch((err) => {
          alert(err.response.data);
          router.replace('/main/mypage');
        });
    };

    return (
      <div className='w-full h-[calc(100vh_+_60px)] bg-gray-50 py-[80px] px-[40px] text-start flex flex-col gap-[20px] overflow-y-scroll'>
        <div className='flex justify-between items-center'>
          <span>나의 취미</span>
          <Image
            src='/main/mypage/close.svg'
            width={25}
            height={25}
            alt='close'
            className='cursor-pointer'
            onClick={() => {
              router.replace('/main/mypage/');
            }}
          />
        </div>
        <div className='w-full flex flex-col bg-white items-center justify-between gap-[5px] p-[20px] rounded-[15px] card-border'>
          <div className='w-full flex justify-center flex-wrap gap-[5px]'>
            {hobbys.map((hobby) => {
              return (
                <button
                  key={hobby}
                  onClick={() => handleHobbyButton(hobby)}
                  className={`flex justify-center items-center gap-[5px] px-[12px] py-[8px] ${isExist(hobby) ? 'focus-btn' : 'btn'}`}
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
          onClick={handleEditInfo}
          className='full-btn w-full px-[20px] py-[10px]'
        >
          수정하기
        </button>
      </div>
    );
  }
};

export default editMyHobby;
