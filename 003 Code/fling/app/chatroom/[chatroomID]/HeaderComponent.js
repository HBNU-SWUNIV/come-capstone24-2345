'use client';

import { collection, doc, getDoc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebaseDB';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HeaderComponent = (props) => {
  const [other, setOther] = useState();
  const chatroomID = usePathname().split('/')[2];
  const router = useRouter();

  // useEffect(() => {
  //   const fetchMemberData = async () => {
  //     const member = doc(db, 'chatrooms', chatroomID);
  //     const docSnap = await getDoc(member);
  //     if (docSnap.exists()) {
  //       setMember(docSnap.data().member);
  //     }
  //   };
  //   fetchMemberData();
  // }, []);

  useEffect(() => {
    if (props.currUser) {
      const fetchOtherInfo = async () => {
        await axios
          .post('/api/chat/otherInfo', { email: props.currUser.email })
          .then((res) => {
            setOther(res.data);
          });
      };
      fetchOtherInfo();
    }
  }, [props.currUser]);

  const handlePrev = () => {
    router.replace('/main/chat');
  };

  return (
    <header className='w-full h-[60px] max-w-[440px] min-w-[330px] fixed top-0 left-1/2 transform -translate-x-1/2 z-[9999] flex gap-[20px] items-center px-[30px] py-[25px] bg-white rounded-b-[10px] border-b-2 border-solid border-slate-200'>
      <button className='relative size-[25px]' onClick={handlePrev}>
        <Image src='/chatting/left.svg' alt='prev' fill />
      </button>
      <span>{other ? other.nickname : '...'}님</span>
    </header>
  );
};

export default HeaderComponent;
