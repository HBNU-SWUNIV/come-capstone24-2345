import { setGlobalDatingType } from '@/lib/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

const ResultDatingType = ({ datingType }) => {
  const description = datingType.description.split(', ');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleNext = () => {
    dispatch(setGlobalDatingType(datingType));
    router.push('/test/register/introduction');
  };

  return (
    <div className='w-full h-screen left-0 flex flex-col justify-center items-center absolute z-20 bg-black/20'>
      <div className='w-[90%] max-w-[400px] h-auto bg-white px-[20px] py-[40px] flex flex-col gap-[20px] rounded-[15px]'>
        <p className='text-title'>{datingType.type}</p>
        <img src='' alt='datingType' className='w-full h-[200px] bg-main-red' />
        <div className='text-subtitle flex flex-col justify-center items-center'>
          <p>{description[0]}</p>
          <p>{description[1]}</p>
        </div>
        <button className='w-full h-[60px] full-btn' onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default ResultDatingType;
