'use client';

import store from '@/library/store';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';

const RegisterLayout = ({ children }) => {
  const router = useRouter();

  const backClickHandler = () => {
    router.back();
  };

  return (
    <div className='w-full relative'>
      {/* bg-[#f6ebfe] */}
      <header className='max-w-[440px] w-full mx-auto h-[60px] bg-[#FBF6FF] fixed top-0 flex items-center'>
        <div className='w-[15%] h-[50%] flex items-center justify-center'>
          <img
            className='h-[80%] aspect-square cursor-pointer'
            src='/direction/chevron-left.svg'
            onClick={backClickHandler}
          />
        </div>

        <div className='w-[70%] h-[50%] flex items-center justify-center'>
          <span className='text-xl ml-[8px]'>회원가입</span>
        </div>

        <div className='w-[15%] h-[50%] flex items-center'></div>
      </header>
      <main className='w-full h-auto pt-[60px]'>
        <div className='flex flex-col items-center px-[20px] pt-[40px]'>
          <Provider store={store}>{children}</Provider>
        </div>
      </main>
    </div>
  );
};

export default RegisterLayout;
