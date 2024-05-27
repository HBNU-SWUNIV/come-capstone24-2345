'use client';

import { useState } from 'react';
import Match from './Match';
import UserCheck from './UserCheck';
import Review from './Review';
import Modal from './Modal';
import { signOut } from 'next-auth/react';

const Main = () => {
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
    <>
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
      <Match />
      <UserCheck handleUserCheck={handleUserCheck} />
      <Review />
      {modal ? (
        <Modal handleModal={handleModal} modal={modal} content={content} />
      ) : null}
    </>
  );
};

export default Main;
