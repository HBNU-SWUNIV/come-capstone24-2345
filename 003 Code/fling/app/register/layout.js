'use client';

import { useRouter } from 'next/navigation';

const RegisterLayout = ({ children, backPage }) => {
  const router = useRouter();

  return (
    <div className='w-full relative'>
      <header className='max-w-[440px] w-full mx-auto h-[100px] bg-[#f6ebfe] fixed top-0 flex items-center'>
        <div className='w-[15%] h-[50%] flex items-center justify-center'>
          <img
            className='h-[70%] aspect-square cursor-pointer'
            src='/direction/chevron-left.svg'
            onClick={() => {
              router.back();
            }}
          />
        </div>

        <div className='w-[70%] h-[50%] flex items-center justify-center'>
          <span className='text-xl ml-[8px]'>회원가입</span>
        </div>

        <div className='w-[15%] h-[50%] flex items-center'></div>
      </header>
      <main className='w-full h-auto py-[100px]'>
        <div className='flex flex-col items-center'>{children}</div>
      </main>
    </div>
  );
};

export default RegisterLayout;
