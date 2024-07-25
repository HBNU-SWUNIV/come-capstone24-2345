import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const InstallAppModal = (props) => {
  const modalRef = useRef();

  useOnClickOutside(modalRef, () => {
    props.setIsInstalledModalOpen(false);
  });
  return (
    <div className='bg-black/20 absolute size-full z-[999] top-0 left-0 flex justify-center'>
      <motion.div
        ref={modalRef}
        className='bg-white w-[90%] h-[100px] mt-[30px] rounded-[15px]'
      >
        공유하기 버튼 누르세요
      </motion.div>
    </div>
  );
};

export default InstallAppModal;
