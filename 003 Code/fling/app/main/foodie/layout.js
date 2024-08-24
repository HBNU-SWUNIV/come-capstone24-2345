import Script from 'next/script';
import React from 'react';
export const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer`;
const FoodieLayout = ({ children }) => {
  return (
    <>
      <Script src={API} strategy='beforeInteractive' />
      {children}
    </>
  );
};

export default FoodieLayout;
