'use client';

import { setGlobalMbti } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterMBTI = () => {
  const [MBTI, setMBTI] = useState(['', '', '', '']);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleButton = (type, groupIndex) => {
    let copy = [...MBTI];
    copy[groupIndex] = type;
    setMBTI(copy);
  };

  const handleNext = () => {
    if (MBTI.includes('')) {
      alert('선택하지 않은 성향이 있습니다');
    } else {
      dispatch(setGlobalMbti(MBTI));
      router.replace('/register/hobby');
    }
  };

  const createLeftMBTI = (type, title, subtitle, groupIndex) => {
    return (
      <div className='w-full flex gap-[20px] items-center'>
        <button
          onClick={() => {
            handleButton(type, groupIndex);
          }}
          className={`size-[65px] text-title ${MBTI[groupIndex] === type ? 'focus-btn' : 'btn'}`}
        >
          {type}
        </button>
        <div className='text-start flex flex-col gap-[4px]'>
          <p
            className={`text-subtitle ${MBTI[groupIndex] === type ? 'text-main-red' : ''}`}
          >
            {title}
          </p>
          <p
            className={`text-info ${MBTI[groupIndex] === type ? 'text-main-red/50' : ''}`}
          >
            {subtitle}
          </p>
        </div>
      </div>
    );
  };

  const createRightMBTI = (type, title, subtitle, groupIndex) => {
    return (
      <div className='w-full flex justify-end gap-[20px] items-center'>
        <div className='text-end flex flex-col gap-[4px]'>
          <p
            className={`text-subtitle ${MBTI[groupIndex] === type ? 'text-main-red' : ''}`}
          >
            {title}
          </p>
          <p
            className={`text-info ${MBTI[groupIndex] === type ? 'text-main-red/50' : ''}`}
          >
            {subtitle}
          </p>
        </div>
        <button
          className={`size-[65px] text-title ${MBTI[groupIndex] === type ? 'focus-btn' : 'btn'}`}
          onClick={() => {
            handleButton(type, groupIndex);
          }}
        >
          {type}
        </button>
      </div>
    );
  };
  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-start'>
          <span className='text-title'>회원님의 MBTI</span>
        </div>

        <div className='w-full mt-[20px]'>
          <div className='w-full flex flex-col gap-[10px]'>
            {createLeftMBTI('I', '내향형', '깊이있는 대인관계 유지', 0)}
            {createLeftMBTI('E', '외향형', '폭넓은 대인관계 유지', 0)}
            {createRightMBTI('N', '직관형', '현재지향적', 1)}
            {createRightMBTI('S', '감각형', '미래지향적', 1)}
            {createLeftMBTI('F', '감정형', '사람, 관계에 관심', 2)}
            {createLeftMBTI('T', '사고형', '진실, 사실에 관심', 2)}
            {createRightMBTI('P', '인식형', '목적과 방향은 변화 가능', 3)}
            {createRightMBTI('J', '판단형', '분명한 목적과 방향', 3)}
          </div>
        </div>

        <div className='w-full'>
          <button
            disabled={MBTI.includes('')}
            onClick={handleNext}
            className={`w-full h-[60px] my-[20px] ${MBTI.includes('') ? 'disabled-btn' : 'full-btn'}`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterMBTI;
