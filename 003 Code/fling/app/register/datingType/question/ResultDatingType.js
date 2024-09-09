import { setGlobalDatingType } from '../../../../library/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { easeInOut } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

const ResultDatingType = ({ datingType }) => {
  const description = datingType.description.split(', ');

  const dispatch = useDispatch();
  const router = useRouter();

  const handleNext = () => {
    dispatch(setGlobalDatingType(datingType));
    router.replace('/register/introduction');
  };

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='enter'
      transition={easeInOut}
      className='w-full h-screen left-0 flex flex-col justify-center items-center absolute z-20 bg-black/20'
    >
      <div className='w-[90%] max-w-[400px] h-auto bg-white px-[20px] py-[40px] flex flex-col gap-[20px] rounded-[15px]'>
        <p className='text-title'>{datingType.type}</p>
        <img src='' alt='datingType' className='w-full h-[200px] bg-main-red' />
        <div className='text-subtitle flex flex-col justify-center items-center'>
          <p>{description[0]}</p>
          <p>{description[1]}</p>
        </div>
        <button className='w-full h-[60px] full-btn' onClick={handleNext}>
          다음
        </button>
      </div>
    </motion.div>
  );
};

export default ResultDatingType;
