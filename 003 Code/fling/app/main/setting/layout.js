'use client';

import React from 'react';
import HeaderComponent from '../HeaderComponent';
import { SessionProvider } from 'next-auth/react';

const settingLayout = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <HeaderComponent pageName='설정' />
        {children}
      </SessionProvider>
    </>
  );
};

export default settingLayout;
