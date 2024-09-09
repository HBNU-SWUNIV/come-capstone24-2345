'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '../../library/store';

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
