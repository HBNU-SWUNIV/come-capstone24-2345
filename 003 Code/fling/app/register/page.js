'use client';

import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  return (
    <>
      <div className='w-full h-[calc(100vh_-_200px)] flex flex-col justify-center items-center'>
        <div className='w-full flex justify-center mb-[40px]'>
          <img
            className='w-[200px] h-[200px] translate-x-[20px]'
            src='/email-auth.svg'
          />
        </div>

        <div className='flex flex-col mb-[20px]'>
          <span className='mb-[8px]'>회원가입에 앞서 대학인증을 위해</span>
          <span>회원님의 학교 이메일과 학생증이 필요해요</span>
        </div>

        <button
          className='card w-[160px] h-[50px] flex justify-center items-center rounded-full content-center mb-[20px]'
          style={{
            fontSize: '14px',
          }}
          onClick={() => {
            router.replace('/register/user');
          }}
        >
          <p className='mr-[8px]'>본인인증</p>
          <p>&gt;</p>
        </button>
      </div>
    </>
  );
};

export default Register;
