'use client';

import { useEffect, useState } from 'react';
import Match from './Match';
import Review from './Review';
import UserCheck from './UserCheck';
import Modal from './Modal';

const Page = () => {
  useEffect(() => {
    // DB에서 content가져옴
  });

  let [modal, setModal] = useState(false);
  let [content, setContent] = useState(null);

  const closeModal = (e) => {
    setModal(e);
  };

  const clickContent = (e) => {
    setContent(e);
    setModal(true);
  };

  return (
    <>
      <div className='size-full relative'>
        {modal ? <Modal content={content} closeModal={closeModal} /> : null}
        <div className='w-full h-[25%] relative'>
          <div
            className='w-[170px] h-[40px] flex justify-center items-center card bg-white'
            style={{ fontSize: '16px' }}
          >
            <span className='mr-2'>🏫</span>
            <span>국립한밭대학교</span>
          </div>
          <Match clickContent={clickContent} />
        </div>

        <UserCheck clickContent={clickContent} />

        <Review clickContent={clickContent} />
      </div>
    </>
  );
};

export default Page;
