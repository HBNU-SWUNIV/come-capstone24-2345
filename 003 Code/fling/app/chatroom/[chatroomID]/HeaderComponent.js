'use client';

import { collection, doc, getDoc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebaseDB';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HeaderComponent = (props) => {
  const [member, setMember] = useState([]);
  const [other, setOther] = useState();
  const chatroomID = usePathname().split('/')[2];
  const router = useRouter();

  useEffect(() => {
    const fetchMemberData = async () => {
      const member = doc(db, 'chatrooms', chatroomID);
      const docSnap = await getDoc(member);
      if (docSnap.exists()) {
        setMember(docSnap.data().member);
      }
    };
    fetchMemberData();
  }, []);

  useEffect(() => {
    if (member && props.currUser) {
      let other = member.filter((email) => email !== props.currUser.email)[0];
      const fetchOtherNickname = async () => {
        await axios
          .post('/api/chat/otherInfo', { email: other })
          .then((res) => {
            setOther(res.data);
          })
          .catch((err) => {
            alert('일시적 오류로 인해 메인페이지로 이동합니다');
            router.replace('/main');
          });
      };

      fetchOtherNickname();
    }
  }, [member, props.currUser]);

  const handlePrev = () => {
    router.replace('/main/chat');
  };

  return (
    <header className='w-full h-[60px] max-w-[440px] min-w-[330px] bg-white fixed top-0 left-1/2 transform -translate-x-1/2 z-[9999] flex gap-[20px] items-center px-[20px]'>
      <button className='relative size-[25px]' onClick={handlePrev}>
        <Image src='/chatting/left.svg' alt='prev' fill />
      </button>
      <span>{other ? other.nickname : '...'}님</span>
    </header>
  );
};

export default HeaderComponent;
