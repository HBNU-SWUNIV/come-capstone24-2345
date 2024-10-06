'use client';

import axios from 'axios';
import JSConfetti from 'js-confetti';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const RegisterSuccess = () => {
  const [isLoading, setIsLoading] = useState(false);
  const confettiRef = useRef();

  const registerUserInfo = useSelector((state) => state.registerUserInfo);

  const router = useRouter();

  useEffect(() => {
    const jsConfetti = new JSConfetti(confettiRef.current);
    if (confettiRef.current) {
      jsConfetti.addConfetti({
        emojis: ['❤️', '🌟', '💥', '✨', '🫧'],
        confettiNumber: 100,
        emojiSize: 20,
      });

      return () => {
        jsConfetti.clearCanvas();
        jsConfetti.destroyCanvas();
      };
    }
  }, [confettiRef]);

  const handleLogin = async () => {
    const info = {
      eventCode: registerUserInfo.eventCode,
      email: registerUserInfo.email,
      emailCert: registerUserInfo.emailCert,
      password: registerUserInfo.password,
      gender: registerUserInfo.gender,
      name: registerUserInfo.name,
      birth: registerUserInfo.birth,
      univ: registerUserInfo.univ,
      department: registerUserInfo.department,
      nickname: registerUserInfo.nickname,
      mbti: registerUserInfo.mbti,
      height: registerUserInfo.height,
      drinkLimit: registerUserInfo.drinkLimit,
      smoking: registerUserInfo.smoking,
      army: registerUserInfo.army,
      hobby: registerUserInfo.hobby,
      datingType: registerUserInfo.datingType,
      univCert: registerUserInfo.univCert,
      introduction: registerUserInfo.introduction,
      profileImg: registerUserInfo.profileImg,
      studentIDImg: registerUserInfo.studentIDImg,
      chatroomID: registerUserInfo.chatroomID,
      religion: registerUserInfo.religion,
      role: registerUserInfo.role,
    };

    try {
      setIsLoading(true);
      const result = await axios.post('/api/register/success', { info });
      console.log(result);
      router.replace('/login');
    } catch (err) {
      alert(err.response.data);
      if (err.response.request.status === 400) {
        router.replace('/');
      }
    }
  };

  return (
    <div className='w-full h-dvh px-[40px] pt-[80px] pb-[120px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div
          ref={confettiRef}
          className='text-start w-3/5 flex flex-col gap-[10px]'
        >
          <p className='text-title text-main-red'>회원가입 완료!</p>
          <p className='text-subtitle break-keep'>
            회원이 되신 것을 축하드립니다
          </p>
          <p className='text-info break-keep text-gray-400'>
            회원님께서 입력하신 정보들은 마이페이지에서 수정이 가능합니다
          </p>
        </div>

        <button
          onClick={handleLogin}
          className={`absolute bottom-[-80px] w-full left-0 full-btn h-[50px] content-center`}
        >
          {isLoading ? '이동중...' : '로그인'}
        </button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
