'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navigator = (props) => {
  let [path, setPath] = useState(['home', 'chat', 'foodie', 'mypage']);
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case '/main':
        setPath(['focused-home', 'chat', 'foodie', 'mypage']);
        break;
      case '/chat':
        setPath(['home', 'focused-chat', 'foodie', 'mypage']);
        break;
      case 'foodie':
        setPath(['home', 'chat', 'focused-foodie', 'mypage']);
        break;
      case 'mypage':
        setPath(['home', 'chat', 'foodie', 'focused-mypage']);
        break;
    }
    console.log(pathname);
  }, [pathname]);

  return (
    <div className='w-[90%] h-[70%] bg-white flex card rounded-full px-[10px] translate-y-[10px]'>
      <Link
        href='/main'
        className='w-1/4 h-full flex flex-col justify-center items-center'
      >
        <img src={`/nav/${path[0]}.svg`} className='size-[35px] mb-[4px]' />

        {/* <span style={{ fontSize: '12px' }}>Home</span> */}
      </Link>
      <Link
        href='/chat'
        className='w-1/4 h-full flex flex-col justify-center items-center'
      >
        <img src={`/nav/${path[1]}.svg`} className='size-[35px] mb-[4px]' />
        {/* <span style={{ fontSize: '12px' }}>Chat</span> */}
      </Link>
      <Link
        href='/foodie'
        className='w-1/4 h-full flex flex-col justify-center items-center'
      >
        <img src={`/nav/${path[2]}.svg`} className='size-[35px] mb-[4px]' />
        {/* <span style={{ fontSize: '12px' }}>Foddie</span> */}
      </Link>
      <Link
        href='/mypage'
        className='w-1/4 h-full flex flex-col justify-center items-center'
        onC
      >
        <img src={`/nav/${path[3]}.svg`} className='size-[35px] mb-[4px]' />
        {/* <span style={{ fontSize: '12px' }}>Mypage</span> */}
      </Link>
    </div>
  );
};

export default Navigator;
