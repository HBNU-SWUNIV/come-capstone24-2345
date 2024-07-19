'use client';

import { setGlobalHobby } from '@/lib/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterHobby = () => {
  const [userHobby, setUserHobby] = useState([]);

  const hobbyList = [
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

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userHobby);
  }, [userHobby]);

  const isArrInHobby = (arr) =>
    userHobby.some((item) => JSON.stringify(item) === JSON.stringify(arr));

  const handleButton = (e, hobby) => {
    if (isArrInHobby(hobby)) {
      setUserHobby(
        userHobby.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(hobby)
        )
      );
    } else {
      setUserHobby([...userHobby, hobby]);
    }
  };

  const handleNext = () => {
    if (userHobby.length === 0) {
      alert('최소 한 가지 이상의 취미를 선택해주세요');
    } else {
      dispatch(setGlobalHobby(userHobby));
      router.replace('/test/register/etc');
    }
  };

  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-start'>
          <span className='text-title'>취미</span>
          <div className='my-[10px] text-subtitle opacity-70'>
            <p>회원님의 취미를 매칭 상대에게 알릴 수 있게</p>
            <p>한 가지 이상 선택해주세요</p>
          </div>
        </div>

        <div className='w-full mt-[20px] flex justify-center flex-wrap gap-[5px]'>
          {hobbyList.map((element) => {
            return (
              <button
                key={element[1]}
                onClick={(e) => handleButton(e, element)}
                className={`flex justify-center items-center gap-[5px] px-[12px] py-[8px] ${isArrInHobby(element) ? 'focus-btn' : 'btn'} `}
              >
                <Image
                  // src={`/register/hobby/${isArrInHobby(element) ? 'checked' : 'unchecked'}/${element[1]}.svg`}
                  src={`/register/hobby/unchecked/${element[1]}.svg`}
                  alt={element[1]}
                  width={20}
                  height={20}
                />
                <span>{element[0]}</span>
              </button>
            );
          })}
        </div>

        <div className='w-full'>
          <button
            disabled={userHobby.length === 0}
            onClick={handleNext}
            className={`w-full h-[60px] my-[20px] ${userHobby.length === 0 ? 'disabled-btn' : 'full-btn'}`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterHobby;
