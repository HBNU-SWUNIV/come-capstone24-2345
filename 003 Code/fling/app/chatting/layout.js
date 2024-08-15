import React from 'react';

const ChattingLayout = ({ children }) => {
  return (
    <>
      <header className='fixed left-1/2 transform -translate-x-1/2 w-full max-w-[440px] min-w-[330px] bg-black/20 text-white h-[100px] z-[9999]'>
        header
      </header>
      {children}
    </>
  );
};

export default ChattingLayout;
