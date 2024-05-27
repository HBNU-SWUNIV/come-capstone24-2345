import Link from 'next/link';
import Navigator from '../Navigator';
import { getServerSession } from 'next-auth';
import authOptions from '@/pages/api/auth/[...nextauth]';
import React from 'react';

const MainLayout = async ({ children }) => {
  let session = await getServerSession(authOptions);
  session ? console.log(session) : console.log(`${session}`);

  return (
    <div className='w-full relative'>
      {/* <div className='w-full h-[90px] flex items-center border-b border-solid border-white/50 px-[20px]'>
        <div className='h-[50%] flex items-center'>
          <img className='h-[80%] aspect-square' src='/logo.png' />
          <span className='text-2xl ml-[8px]'>플링</span>
        </div>
      </div> */}

      <header className='max-w-[440px] w-full mx-auto h-[60px] bg-[#f6ebfe] px-[20px] fixed top-0 flex items-center'>
        <Link href='/main' className='h-[50%] flex items-center'>
          <img className='h-[80%] aspect-square' src='/logo.png' />
          <span className='text-2xl ml-[8px]'>플링</span>
        </Link>
      </header>

      {/* <header className='max-w-[440px] w-full mx-auto h-[100px] bg-black/50 fixed top-0'></header> */}
      <main className='w-full h-auto pt-[60px] pb-[120px] px-[20px]'>
        <div className='w-full flex flex-col items-center'>{children}</div>
      </main>
      <nav className='max-w-[440px] w-full mx-auto h-[100px] fixed bottom-0 flex justify-center '>
        <Navigator />
      </nav>
    </div>
  );
};

export default MainLayout;
