'use client';

import { useState } from 'react';
import Match from './Match';
import Review from './Review';
import UserCheck from './UserCheck';
import Modal from './Modal';

export default function Main() {
  let [modal, setModal] = useState(false);
  let [content, setContent] = useState(null);

  const handleModal = (bool) => {
    setModal(bool);
  };

  const handleUserCheck = (data) => {
    setContent(data);
    setModal(true);
    console.log(data);
  };

  return (
    // <div className='size-full overflow-y-scroll'>
    // <div className='flex flex-col items-center'>
    <div className='size-full flex flex-col items-center'>
      <Match />

      <UserCheck handleUserCheck={handleUserCheck} />

      <Review />

      {modal ? (
        <Modal handleModal={handleModal} modal={modal} content={content} />
      ) : null}
    </div>
    // </div>
    // </div>
  );
}
