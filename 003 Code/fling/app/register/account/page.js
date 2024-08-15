'use client';

import { setGlobalNickname, setGlobalPassword } from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const RegisterAccount = () => {
  const [nickname, setNickname] = useState('');
  const [clickCheckNickname, setClickCheckNickname] = useState(0);
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.registerUserInfo.email);
  const router = useRouter();

  // useEffect(() => {
  //   if (userId === '') {
  //     alert('잘못된 접근방식입니다');
  //     alert('초기화면으로 돌아갑니다');
  //     router.replace('/test');
  //   }
  // }, []);
  useEffect(() => {
    console.log(isCheckedNickname);
  }, [isCheckedNickname]);

  const handleNickname = (e) => {
    setClickCheckNickname(0);
    setNickname(e.target.value);
  };

  const checkNickname = async () => {
    await axios
      .post('/api/check/nickname', { nickname })
      .then((result) => {
        setNickname(result.data.nickname);
        setIsCheckedNickname(true);
      })
      .catch((err) => {
        setIsCheckedNickname(false);
        alert(err.response.data);
      });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  const handleNext = async () => {
    if (clickCheckNickname < 1) {
      alert('닉네임 중복확인을 해주세요');
    } else if (!isCheckedNickname) {
      alert('사용할 수 없는 닉네임입니다');
    } else {
      await axios
        .post('/api/check/password', { password, checkPassword })
        .then((result) => {
          dispatch(setGlobalPassword(result.data));
          dispatch(setGlobalNickname(nickname));
          router.replace('/register/mbti');
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  };

  return (
    <div className='w-full h-screen px-[40px] relative overflow-y-scroll'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-start'>
          <span className='text-title'>계정생성</span>
        </div>

        <div className='w-full mt-[20px] flex flex-col gap-[20px]'>
          <form className='w-full flex flex-col gap-[10px]'>
            <div className='flex gap-[20px]'>
              <div className='relative w-full'>
                <input
                  placeholder=' '
                  onChange={handleNickname}
                  // maxLength={8}
                  className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn'
                />

                <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
                  닉네임
                </label>
              </div>
              <button
                className='w-full full-btn'
                onClick={(e) => {
                  e.preventDefault();
                  checkNickname();
                  setClickCheckNickname((prev) => prev + 1);
                }}
              >
                중복확인
              </button>
            </div>
            <div className='flex flex-col text-info text-start pl-[10px]'>
              <span className='text-main-red mb-[5px]'>
                {clickCheckNickname > 0
                  ? isCheckedNickname
                    ? '사용가능한 닉네임이에요'
                    : '사용할 수 없는 닉네임이에요'
                  : null}
              </span>
              <span className='text-black/50'>
                닉네임은 최소 4자, 최대 8자까지 가능합니다
              </span>
              <span className='text-black/50'>
                닉네임은 한글이나 영어가 최소 한 글자 이상 포함되어야 합니다
              </span>
            </div>
          </form>

          <form className='w-full flex flex-col gap-[20px] mb-[10px]'>
            <div className='w-full flex flex-col gap-[10px]'>
              <div className='relative w-full'>
                <input
                  placeholder=' '
                  value={userId}
                  disabled
                  className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn bg-transparent'
                />

                <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
                  아이디
                </label>
              </div>
              <span className='text-start text-info pl-[10px] text-black/50'>
                아이디는 학교 이메일을 사용해요
              </span>
            </div>

            <div className='w-full flex flex-col gap-[10px]'>
              <div className='relative w-full'>
                <input
                  type='password'
                  placeholder=' '
                  onChange={handlePassword}
                  className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn'
                />

                <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
                  비밀번호
                </label>
              </div>
              <div className='text-start text-info pl-[10px] text-black/50'>
                <p>숫자, 특수기호를 최소 하나 이상 조합해야 해요</p>
                <p>최소 8자 이상이어야 해요</p>
              </div>
            </div>

            <div className='w-full flex flex-col gap-[10px]'>
              <div className='relative w-full'>
                <input
                  type='password'
                  placeholder=' '
                  onChange={handleCheckPassword}
                  className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn'
                />

                <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
                  비밀번호 재입력
                </label>
              </div>
              <span className='text-main-red text-info text-start pl-[10px]'>
                {password !== '' && checkPassword !== ''
                  ? password === checkPassword
                    ? '비밀번호가 일치합니다'
                    : '비밀번호가 일치하지 않습니다'
                  : null}
              </span>
            </div>
          </form>
        </div>

        {/* <div className='w-[calc(100%_-_80px)]'> */}
        <div className='w-full'>
          <button
            onClick={handleNext}
            disabled={
              nickname === '' || password === '' || checkPassword === ''
            }
            // onClick={handleSecondPageNext}
            className={`w-full h-[60px] my-[20px] ${nickname === '' || password === '' || checkPassword === '' ? 'disabled-btn' : 'full-btn'}`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterAccount;
