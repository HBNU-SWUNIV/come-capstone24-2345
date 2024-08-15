'use client';

import { setGlobalIntroduction } from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterIntroduction = () => {
  const [introduction, setIntroduction] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleIntroduction = (e) => {
    setIntroduction(e.target.value);
  };

  const handleNext = async () => {
    await axios
      .post('/api/check/introduction', { introduction })
      .then((result) => {
        dispatch(setGlobalIntroduction(result.data.introduction));
        router.replace('/register/success');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-start'>
          <span className='text-title'>한 줄 소개</span>
          <div className='my-[10px] opacity-70 text-subtitle'>
            <p>회원님을 한 줄로 표현해주세요</p>
          </div>
        </div>

        <div className='w-full mt-[20px] flex justify-center flex-wrap gap-[10px]'>
          <div className='relative w-full'>
            <input
              placeholder=' '
              onChange={handleIntroduction}
              className='floating-label-input block w-full h-[50px] rounded-[15px] focus:outline-none px-[20px] py-[30px] border border-[#E8E6EA] border-solid'
            />

            <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
              자유롭게 작성해 주세요
            </label>
          </div>
        </div>

        <fieldset className='text-start w-full border border-[#E8E6EA] border-solid rounded-[15px] p-[20px] mt-[20px]'>
          <legend className='px-[10px] text-main-red'>Tip</legend>
          <div className='flex flex-col gap-[15px]'>
            <div className='flex flex-col gap-[5px]'>
              <p>취미를 강조해보세요</p>
              <p className='text-info opacity-70 ml-[10px]'>
                "커피 마시며 독서하는 시간을 좋아하는 감성러입니다☕📚"
              </p>
            </div>
            <div className='flex flex-col gap-[5px]'>
              <p>유머 감각을 보여주세요</p>
              <p className='text-info opacity-70 ml-[10px]'>
                "나무를 좋아하는 사람? 저랑 대화해요, 식물과 대화하는 건 아직
                익숙하지 않거든요🌿😅"
              </p>
            </div>
            <div className='flex flex-col gap-[5px]'>
              <p>특별한 경험이나 목표를 공유해보세요</p>
              <p className='text-info opacity-70 ml-[10px]'>
                "요리 배우고 있는데 저의 요리를 맛봐줄 분을 찾고 있어요👨‍🍳"
              </p>
            </div>
            <div className='flex flex-col gap-[5px]'>
              <p>성격과 가치관을 드러내보세요</p>
              <p className='text-info opacity-70 ml-[10px]'>
                "같이 성장할 수 있는 사람을 찾고 있어요🌱"
              </p>
            </div>
          </div>
        </fieldset>

        <div className='w-full'>
          <button
            disabled={introduction === ''}
            onClick={handleNext}
            className={`w-full h-[60px] my-[20px] ${introduction === '' ? 'disabled-btn' : 'full-btn'}`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterIntroduction;
