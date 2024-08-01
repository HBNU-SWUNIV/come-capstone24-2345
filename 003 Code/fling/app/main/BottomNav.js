'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BottomNav = () => {
  const [path, setPath] = useState('');
  const currPath = usePathname();
  useEffect(() => {
    let pathArr = currPath.split('/main/');
    setPath(pathArr[1]);
  }, [currPath]);
  return (
    <nav className='w-full h-[80px] max-w-[440px] min-w-[330px] fixed bottom-0 left-1/2 transform -translate-x-1/2 rounded-t-[15px] flex px-[10px] bg-white shadow-inner z-[9999]'>
      <Link
        href={'/main'}
        className='w-1/5 flex flex-col justify-center items-center'
      >
        <Image
          src={`/bottomNav/${path === 'home' ? '' : 'un'}checked/home.svg`}
          width={30}
          height={30}
          alt='home'
        />
        <span
          className={`text-info text-main-red/50 ${path === 'home' ? null : 'hidden'}`}
        >
          홈
        </span>
      </Link>
      <Link
        href={'/main/foodie'}
        className='w-1/5 flex flex-col justify-center items-center'
      >
        <Image
          src={`/bottomNav/${path === 'foodie' ? '' : 'un'}checked/foodie.svg`}
          width={30}
          height={30}
          alt='foodie'
        />
        <span
          className={`text-info text-main-red/50 ${path === 'foodie' ? null : 'hidden'}`}
        >
          장소추천
        </span>
      </Link>
      <Link
        href={'/main/chat'}
        className='w-1/5 flex flex-col justify-center items-center'
      >
        <Image
          src={`/bottomNav/${path === 'chat' ? '' : 'un'}checked/chat.svg`}
          width={30}
          height={30}
          alt='chat'
        />
        {/* <span
          className={`text-info text-main-red/50 ${path === 'chat' ? null : 'hidden'}`}
        >
          채팅
        </span> */}
        {/* <div className='size-[5px] bg-main-red rounded-full'></div> */}
      </Link>
      <Link
        href={'/main/mypage'}
        className='w-1/5 flex flex-col justify-center items-center'
      >
        <Image
          src={`/bottomNav/${path === 'mypage' ? '' : 'un'}checked/mypage.svg`}
          width={30}
          height={30}
          alt='mypage'
        />
        <span
          className={`text-info text-main-red/50 ${path === 'mypage' ? null : 'hidden'}`}
        >
          마이페이지
        </span>
      </Link>
      <Link
        href={'/main/setting'}
        className='w-1/5 flex flex-col justify-center items-center'
      >
        <Image
          src={`/bottomNav/${path === 'setting' ? '' : 'un'}checked/setting.svg`}
          width={30}
          height={30}
          alt='setting'
        />
        <span
          className={`text-info text-main-red/50 ${path === 'setting' ? null : 'hidden'}`}
        >
          설정
        </span>
      </Link>
    </nav>
  );
};

export default BottomNav;
