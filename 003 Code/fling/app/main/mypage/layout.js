'use client';

import React from 'react';
import HeaderComponent from '../HeaderComponent';
const layout = ({ children }) => {
  return (
    <>
      <HeaderComponent pageName='마이페이지' />
      {children}
    </>
  );
};

export default layout;
