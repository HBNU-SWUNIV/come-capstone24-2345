'use client';

import store from '@/lib/store';
import React from 'react';
import { Provider } from 'react-redux';

const layout = ({ children }) => {
  function isPageOverscrolled() {
    return (
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight
    );
  }
  return <Provider store={store}>{children}</Provider>;
};

export default layout;
