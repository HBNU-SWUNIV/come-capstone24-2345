'use client';

import BottomNav from './BottomNav';
import React from 'react';
import { SessionProvider } from 'next-auth/react';

const Layout = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <BottomNav />
    </>
  );
};

export default Layout;
