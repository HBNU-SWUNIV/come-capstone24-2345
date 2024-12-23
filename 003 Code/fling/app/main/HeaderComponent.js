'use client';

import Image from 'next/image';
import React from 'react';

const HeaderComponent = (props) => {
  const handleSearch = () => {
    props.onMapOptionOpenChange(true);
  };
  return (
    <header className='w-full h-[60px] max-w-[440px] min-w-[330px] fixed top-0 left-1/2 transform -translate-x-1/2 z-[9999] flex gap-[20px] items-center px-[30px] py-[25px] bg-white border-b-2 border-solid border-slate-200'>
      <span className='text-title'>{props.pageName}</span>
      {props.pageName === '장소' ? (
        <button
          className='bg-white border border-main-red flex-1 flex gap-[10px] items-center w-full h-[40px] rounded-full px-[20px]'
          onClick={handleSearch}
        >
          <Image
            src={'/header/search.svg'}
            width={20}
            height={20}
            alt='search'
          />
          <span className='text-black/50 text-subtitle truncate'>
            {props.searchValue ? props.searchValue : '시/시군구/동에서 찾기'}
          </span>
        </button>
      ) : null}
    </header>
  );
};

export default HeaderComponent;
