import React from 'react';
import { Spinner } from '@nextui-org/react';

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black/30'>
      <Spinner
        label='잠시만 기다려주세요...'
        color='danger'
        labelColor='danger'
      />
    </div>
  );
};

export default Loading;
