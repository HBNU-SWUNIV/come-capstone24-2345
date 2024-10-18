'use client';

import { useDispatch, useSelector } from 'react-redux';
import BottomNav from './BottomNav';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { setChatActive, setChatActiveEmail } from '@/library/store';
import axios from 'axios';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const isActive = useSelector((state) => state.chatActive.isActive);
  const userEmail = useSelector((state) => state.chatActive.email);

  useEffect(() => {
    if (isActive && userEmail) {
      dispatch(setChatActive(false));
      const fetchLastConnection = async () => {
        await axios.post('/api/chat/connect', {
          isActive: false,
          email: userEmail,
          chatroomID: session.user.chatroomID,
        });
      };
      fetchLastConnection();
    }
  }, [userEmail, isActive]);

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(setChatActiveEmail(session.user.email));
    }
  }, [session, status]);

  return (
    <>
      {children}
      <BottomNav />
    </>
  );
};

export default Layout;
