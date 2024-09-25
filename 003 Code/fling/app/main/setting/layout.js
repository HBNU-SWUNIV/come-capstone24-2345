'use client';

import React from 'react';
import HeaderComponent from '../HeaderComponent';

const settingLayout = ({ children }) => {
  return (
    <>
      <HeaderComponent pageName='설정' />
      {children}
    </>
  );
};

export default settingLayout;
