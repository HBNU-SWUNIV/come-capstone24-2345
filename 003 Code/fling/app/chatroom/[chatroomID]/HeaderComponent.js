'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Spinner } from '@nextui-org/spinner';

const HeaderComponent = (props) => {
  const [other, setOther] = useState();
  const [isExistGroup, setIsExistGroup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (props.currUser) {
      const fetchOtherUserInfo = async () => {
        axios
          .post('/api/group/otherUserInfo?reqExist=true', {
            email: props.currUser.email,
          })
          .then((res) => {
            setIsExistGroup(true);
          })
          .catch((err) => {
            router.replace('/main/chat');
          });
      };
      fetchOtherUserInfo();
    }
  }, [props.currUser]);

  useEffect(() => {
    if (isExistGroup) {
      const fetchOtherInfo = async () => {
        await axios
          .post('/api/chat/otherInfo', { email: props.currUser.email })
          .then((res) => {
            setOther(res.data);
          });
      };
      fetchOtherInfo();
    }
  }, [isExistGroup]);

  const handlePrev = () => {
    router.replace('/main/chat');
  };

  return (
    <header className='w-full h-[60px] max-w-[440px] min-w-[330px] fixed top-0 left-1/2 transform -translate-x-1/2 z-[9999] flex gap-[20px] items-center px-[20px] py-[25px] bg-white border-b-2 border-solid border-slate-200'>
      <button className='relative size-[25px]' onClick={handlePrev}>
        <Image src='/chatting/left.svg' alt='prev' fill />
      </button>

      {other ? (
        <span>{other.nickname}님</span>
      ) : (
        <Spinner size='sm' color='danger' />
      )}
    </header>
  );
};

export default HeaderComponent;
