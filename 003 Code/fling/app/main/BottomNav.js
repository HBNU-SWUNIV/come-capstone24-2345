'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const BottomNav = () => {
  const currPath = usePathname().split('/')[2];
  return (
    <nav className='w-full h-[80px] max-w-[440px] min-w-[330px] fixed bottom-0 left-1/2 transform -translate-x-1/2 flex px-[10px] pt-[10px] pb-[10px] bg-white border-t-2 border-solid border-slate-200 z-[999999]'>
      <Link
        href={'/main/home'}
        replace={true}
        scroll={false}
        className='w-1/5 flex flex-col justify-start items-center cursor-pointer'
      >
        <Image
          src={`/bottomNav/${currPath === 'home' ? '' : 'un'}checked/main.svg`}
          width={30}
          height={30}
          alt='home'
        />
      </Link>
      <Link
        href={'/main/place'}
        replace={true}
        scroll={false}
        className='w-1/5 flex flex-col justify-start items-center cursor-pointer'
      >
        <Image
          src={`/bottomNav/${currPath === 'place' ? '' : 'un'}checked/foodie.svg`}
          width={30}
          height={30}
          alt='foodie'
        />
      </Link>
      <Link
        href={'/main/chat'}
        replace={true}
        scroll={false}
        className='w-1/5 flex flex-col justify-start items-center cursor-pointer'
      >
        <Image
          src={`/bottomNav/${currPath === 'chat' ? '' : 'un'}checked/chat.svg`}
          width={30}
          height={30}
          alt='chat'
        />
        {/* <div className='size-[5px] bg-main-red rounded-full'></div> */}
      </Link>
      <Link
        href={'/main/mypage'}
        replace={true}
        scroll={false}
        className='w-1/5 flex flex-col justify-start items-center cursor-pointer'
      >
        <Image
          src={`/bottomNav/${currPath === 'mypage' ? '' : 'un'}checked/mypage.svg`}
          width={30}
          height={30}
          alt='mypage'
        />
      </Link>
      <Link
        href={'/main/setting'}
        replace={true}
        scroll={false}
        className='w-1/5 flex flex-col justify-start items-center cursor-pointer'
      >
        <Image
          src={`/bottomNav/${currPath === 'setting' ? '' : 'un'}checked/setting.svg`}
          width={30}
          height={30}
          alt='setting'
        />
      </Link>
    </nav>
  );
};

export default BottomNav;
