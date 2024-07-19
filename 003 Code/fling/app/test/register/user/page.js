'use client';

import { useEffect, useState } from 'react';
import CalendarModal from './CalendarModal';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setGlobalBirth, setGlobalName } from '@/lib/store';
import Image from 'next/image';

const RegisterUser = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [birth, setBirth] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const selector = useSelector((state) => state.registerUserInfo);

  useEffect(() => {
    console.log(selector);
  }, [selector]);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleBirth = () => {
    setOpenModal(true);
  };

  const handleNext = async () => {
    await axios
      .post('/api/check/userInfo', { name, birth })
      .then((result) => {
        dispatch(setGlobalName(result.data.name));
        dispatch(setGlobalBirth(result.data.birth));
        router.replace('/test/register/univ');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-start'>
          <p className='text-title'>회원님의 성명과</p>
          <p className='text-title'>생년월일을 입력해주세요</p>
        </div>

        <div className='w-full mt-[40px] flex flex-col gap-[20px]'>
          <div className='relative w-full'>
            <input
              onChange={handleName}
              placeholder=' '
              className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn'
            />
            <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
              성명
            </label>
          </div>
          <button
            onClick={handleBirth}
            className={`w-full flex gap-[20px] text-start p-[20px] ${birth ? 'btn' : 'bg-main-red/15 rounded-[15px]'} text-white`}
          >
            <Image
              src='/register/user/calendar.svg'
              width={25}
              height={25}
              alt='calendar'
            />
            <p className='text-main-red'>
              {birth == null
                ? '생년월일을 선택해주세요'
                : `${birth.year}-${birth.month}-${birth.day}`}
            </p>
          </button>
        </div>

        {openModal ? (
          <CalendarModal
            setBirth={setBirth}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        ) : null}

        <div className='absolute bottom-[50px] w-[calc(100%_-_80px)]'>
          <button
            disabled={name === '' || birth === null}
            onClick={handleNext}
            className={`w-full h-[60px] my-[20px] ${name === '' || birth === null ? 'disabled-btn' : 'full-btn'}`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
