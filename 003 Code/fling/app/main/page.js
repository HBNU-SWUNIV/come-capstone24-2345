'use client';

import { useEffect } from 'react';
import HeaderComponent from './HeaderComponent';

const MainPage = ({ userinfo }) => {
  useEffect(() => {
    console.log(userinfo);
  }, [userinfo]);
  // if (userInfo) {
  return (
    <>
      <HeaderComponent pageName='메인' />
      <div className='w-full h-[200px] flex flex-col bg-black/50 px-[40px] pt-[80px] text-start'>
        <div>
          {/* <span>🏫 {user?.name}</span> */}
          <span>하이</span>
        </div>
      </div>
    </>
  );
  // }
};

export default MainPage;
