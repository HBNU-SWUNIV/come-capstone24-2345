'use client';

import { useState } from 'react';

const UserCheck = (props) => {
  let [content, setContent] = useState([
    {
      key: 'personality',
      img: 'heart-front',
      title: '성격이 비슷한 사람 조회',
      subtitle: '성격이 비슷하다면 끈끈한 연애',
    },
    {
      key: 'hobby',
      img: 'target-front',
      title: '같은 취미를 가진 사람 조회',
      subtitle: '같은 취미가 많다면 재밌는 연애',
    },
    {
      key: 'mbti',
      img: 'fire-front',
      title: '나의 MBTI와 맞는 사람 조회',
      subtitle: '~~~~~',
    },
  ]);

  const clickHandler = (key) => {
    const data = content.find((item) => item.key === key);
    props.handleUserCheck(data);
  };

  return (
    <>
      <div
        className='w-full text-start mt-[20px] mb-[20px]'
        style={{ fontSize: '16px' }}
      >
        <span className='mr-2'>🔎</span>
        <span>나와 비슷한 사람 조회하기</span>
        <br />
        <span className='text-indigo-800' style={{ fontSize: '10px' }}>
          나와 맞는 사람이 몇 명이나 있는지 조회할 수 있어요!
        </span>
      </div>

      {content.map((e, i) => {
        return (
          <div
            key={e.key}
            className='card w-full h-[80px] px-[20px] rounded-[20px] flex items-center mb-[20px] cursor-pointer'
            onClick={() => {
              clickHandler(e.key);
            }}
          >
            <div className='w-[15%] flex justify-center items-center'>
              <img className='w-[40px] h-[40px]' src={`/${e.img}.svg`} />
            </div>
            <div className='w-[75%] text-start pl-[15px] flex flex-col'>
              <span style={{ fontSize: '14px' }} className='mb-[12px]'>
                {e.title}
              </span>
              <span style={{ fontSize: '10px' }}>{e.subtitle}</span>
            </div>
            <div className='w-[10%] flex justify-center items-center'>
              <img
                className='w-[12px] h-[12px]'
                src='/direction/arrow-right.svg'
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default UserCheck;
