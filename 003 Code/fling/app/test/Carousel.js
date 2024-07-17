'use client';

import { useEffect, useRef, useState } from 'react';

const CarouselComponent = () => {
  let [page, setPage] = useState(0);
  const content = [
    {
      title: '간편한 매칭',
      subtitle1: '단 한 번의 버튼 클릭으로',
      subtitle2: '완전한 랜덤 매칭이 이루어져요',
    },
    {
      title: '매칭 알고리즘',
      subtitle1: '상단의 코드 받기를 통해',
      subtitle2: '소개팅을 할 수 있도록 회원님을 선정해요',
    },
    {
      title: '무료 매칭',
      subtitle1: '상대방과의 매칭은 비용이 들지 않아요',
      subtitle2: '',
    },
  ];

  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPage((prev) => {
        if (prev == 2) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className='size-full flex flex-col'>
      <div className='h-[270px] flex flex-grow justify-center items-center mb-[10px]'>
        <img className='h-full object-contain' src={`/start/${page}.svg`} />
      </div>

      <div className=''>
        <div>
          <span className='text-title text-main-red'>
            {content[page]?.title}
          </span>
          <div className='text-subtitle opacity-60 mt-[10px]'>
            <p>{content[page]?.subtitle1}</p>
            <p>{content[page]?.subtitle2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
