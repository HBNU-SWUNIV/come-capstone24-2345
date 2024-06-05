'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Last = () => {
  const router = useRouter();

  const globalUserInfo = useSelector((state) => state.registerUserInfo);

  const clickHandler = async (e) => {
    const isEmpty = (object) =>
      !Object.values(object).every(
        (element) => element !== null && element !== ''
      );

    if (!isEmpty(globalUserInfo)) {
      await axios.post('/api/user/info', globalUserInfo).then((result) => {
        alert(result.data);
        router.replace('/login');
      });
    } else {
      alert('비정상적인 접근입니다');
      alert('회원가입 페이지로 이동합니다');
      router.replace('/register');
    }
  };
  return (
    <div className='w-full h-[calc(100vh_-_200px)] flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center justify-center mb-[20px]'>
        <span
          className='mb-[20px]'
          style={{ fontSize: '22px', fontWeight: '700' }}
        >
          🎉 회원가입이 완료되었어요!
        </span>
        <span className='mb-[8px]' style={{ fontSize: '12px' }}>
          여러분의 프로필을 작성한 후 매칭이 가능합니다
        </span>
        <span className='mb-[8px]' style={{ fontSize: '12px' }}>
          Mypage &gt; 프로필수정, 나의 취미, 나의 성격
        </span>
      </div>

      <button
        className='w-[50%] btn p-[20px] rounded-full'
        onClick={clickHandler}
      >
        로그인하기
      </button>
    </div>
  );
};

export default Last;
