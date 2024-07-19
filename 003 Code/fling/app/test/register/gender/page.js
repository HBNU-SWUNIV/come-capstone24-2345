'use client';

import { setGlobalGender } from '@/lib/store';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const RegisterGender = () => {
  const [gender, setGender] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const handleGender = (type) => {
    if (type === 'man') {
      setGender('man');
    } else if (type === 'woman') {
      setGender('woman');
    }
  };

  const handleNext = async () => {
    await axios
      .post('/api/check/gender', { gender })
      .then((result) => {
        dispatch(setGlobalGender(result.data));
        router.replace('/test/register/user');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  return (
    <div className='w-full h-screen px-[40px]'>
      <div className='size-full flex flex-col items-center relative'>
        <div className='w-full mt-[120px] text-start'>
          <p className='text-title'>회원님의 성별을</p>
          <p className='text-title'>선택해주세요</p>
        </div>

        <div className='w-full mt-[40px] flex flex-col gap-[20px]'>
          <button
            onClick={() => handleGender('man')}
            className={`w-full flex justify-between text-start p-[20px] ${gender === 'man' ? 'focus-btn' : 'btn'}`}
          >
            <p>남학생입니다</p>
            <Image
              width={25}
              height={25}
              alt='check'
              src={`/register/gender/${gender === 'man' ? 'checked' : 'unchecked'}.svg`}
            />
          </button>
          <button
            onClick={() => handleGender('woman')}
            className={`w-full flex justify-between text-start p-[20px] ${gender === 'woman' ? 'focus-btn' : 'btn'}`}
          >
            <p>여학생입니다</p>
            <Image
              width={25}
              height={25}
              alt='check'
              src={`/register/gender/${gender === 'woman' ? 'checked' : 'unchecked'}.svg`}
            />
          </button>
        </div>

        <div className='absolute bottom-[50px] w-full'>
          <button
            disabled={gender === ''}
            onClick={handleNext}
            className={`w-full h-[60px] my-[20px] ${gender === '' ? 'disabled-btn' : 'full-btn'}`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterGender;
