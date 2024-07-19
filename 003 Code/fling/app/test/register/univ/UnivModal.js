'use client';

import React, { useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { Input } from '@nextui-org/react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const UnivModal = (props) => {
  const [searchValue, setSearchValue] = useState([]);

  const modalRef = useRef();

  useOnClickOutside(modalRef, () => {
    props.setUnivModalOpen(false);
  });

  const handleInput = (e) => {
    let searchUnivList = props.univList.filter((element) => {
      if (element.includes(e.target.value)) {
        return element;
      }
    });

    setSearchValue(searchUnivList);
  };

  const clickUniv = (e) => {
    props.setUniv(e.target.innerHTML);
    props.setUnivModalOpen(false);
  };
  return (
    <div
      // className={`w-full h-screen flex flex-col justify-end absolute z-20 transition-transform duration-500 ${props.isOpenModal ? '' : 'translate-y-[100vh]'}`}
      className={`size-full flex flex-col justify-end absolute z-[999] bg-black/20`}
    >
      <motion.div
        initial={{ x: 0, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        ref={modalRef}
        className={`w-full min-h-[440px] h-[50vh] flex flex-col justify-around rounded-t-[30px] p-[40px] bg-white z-30 relative `}
      >
        <div className='relative'>
          <Input
            type='text'
            variant='underlined'
            //   label='학교명'
            placeholder='학교명을 입력해주세요'
            onChange={handleInput}
          />
          <Image
            className='absolute right-[20px] top-[5px]'
            src='/register/univ/search.svg'
            alt='search'
            width={25}
            height={25}
          />
        </div>
        <div className='w-full flex-grow mt-[10px] overflow-y-scroll'>
          {searchValue.length === 0
            ? props.univList?.map((univ) => {
                return (
                  <button
                    key={univ}
                    onClick={clickUniv}
                    className='w-full text-start pl-[10px] py-[5px]'
                  >
                    {univ}
                  </button>
                );
              })
            : searchValue.map((univ) => {
                return (
                  <button
                    key={univ}
                    onClick={clickUniv}
                    className='w-full text-start pl-[10px] py-[5px]'
                  >
                    {univ}
                  </button>
                );
              })}
        </div>
        {/* <button
          onClick={handleSubmit}
          className='w-full h-[60px] my-[20px] full-btn'
        >
          확인
        </button> */}
      </motion.div>
    </div>
  );
};

export default UnivModal;
