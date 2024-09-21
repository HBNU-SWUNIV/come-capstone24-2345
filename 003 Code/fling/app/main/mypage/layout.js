'use client';

import React from 'react';
import HeaderComponent from '../HeaderComponent';
import { SessionProvider } from 'next-auth/react';
const layout = ({ children }) => {
  return (
    <SessionProvider>
      <HeaderComponent pageName='마이페이지' />
      {children}
    </SessionProvider>
  );
};

export default layout;
