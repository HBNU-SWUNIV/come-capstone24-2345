import Script from 'next/script';
import React from 'react';

const FoodieLayout = ({ children }) => {
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer`}
        strategy='beforeInteractive'
      />
      {children}
    </>
  );
};

export default FoodieLayout;
