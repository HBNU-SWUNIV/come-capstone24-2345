'use client';

import BottomNav from './BottomNav';
import React, { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import HeaderComponent from './HeaderComponent';

const Layout = ({ children }) => {
  // const [currPathName, setCurrPathName] = useState();
  // const pathName = usePathname();

  // useEffect(() => {
  //   switch (pathName) {
  //     case '/main':
  //       setCurrPathName('메인');
  //       break;
  //     case '/main/foodie':
  //       setCurrPathName('장소추천');
  //       break;
  //     case '/main/chat':
  //       setCurrPathName('채팅');
  //       break;
  //     case '/main/mypage':
  //       setCurrPathName('마이페이지');
  //       break;
  //     case '/main/setting':
  //       setCurrPathName('설정');
  //       break;
  //   }
  // }, [pathName]);

  return (
    <>
      {/* <HeaderComponent pageName={currPathName} /> */}
      <SessionProvider>{children}</SessionProvider>
      <BottomNav />
    </>
  );
};

export default Layout;
