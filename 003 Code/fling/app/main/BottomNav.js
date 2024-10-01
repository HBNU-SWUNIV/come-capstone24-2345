'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BottomNav = () => {
  const [path, setPath] = useState('');
  const currPath = usePathname();
  const router = useRouter();
  useEffect(() => {
    setPath(currPath);
  }, [currPath]);
  return (
    <nav className='w-full h-[80px] max-w-[440px] min-w-[330px] fixed bottom-0 left-1/2 transform -translate-x-1/2 rounded-t-[15px] flex px-[10px] pt-[15px] pb-[10px] bg-white border-t-2 border-solid border-slate-200 z-[999999]'>
      <a
        onClick={() => router.replace('/main')}
        className='w-1/5 flex flex-col justify-start items-center cursor-pointer'
      >
        <Image
          src={`/bottomNav/${path === '/main' ? '' : 'un'}checked/main.svg`}
          width={30}
          height={30}
          alt='home'
        />
      </a>
      <a
        onClick={() => {
          router.replace('/main/foodie');
          router.refresh();
        }}
        className='w-1/5 flex flex-col justify-start items-center cursor-pointer'
      >
        <Image
          src={`/bottomNav/${path === '/main/foodie' ? '' : 'un'}checked/foodie.svg`}
          width={30}
          height={30}
          alt='foodie'
        />
      </a>
      <a
        onClick={() => router.replace('/main/chat')}
        className='w-1/5 flex flex-col justify-start items-center cursor-pointer'
      >
        <Image
          src={`/bottomNav/${path === '/main/chat' ? '' : 'un'}checked/chat.svg`}
          width={30}
          height={30}
          alt='chat'
        />
        {/* <div className='size-[5px] bg-main-red rounded-full'></div> */}
      </a>
      <a
        onClick={() => router.replace('/main/mypage')}
        className='w-1/5 flex flex-col justify-start items-center cursor-pointer'
      >
        <Image
          src={`/bottomNav/${path === '/main/mypage' ? '' : 'un'}checked/mypage.svg`}
          width={30}
          height={30}
          alt='mypage'
        />
      </a>
      <a
        onClick={() => router.replace('/main/setting')}
        className='w-1/5 flex flex-col justify-start items-center cursor-pointer'
      >
        <Image
          src={`/bottomNav/${path === '/main/setting' ? '' : 'un'}checked/setting.svg`}
          width={30}
          height={30}
          alt='setting'
        />
      </a>
    </nav>
  );
};

export default BottomNav;
