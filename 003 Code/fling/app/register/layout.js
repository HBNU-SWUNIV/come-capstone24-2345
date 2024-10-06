'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { setStoreInitialize } from '../../library/store';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

import CloseSvg from '../../public/register/close.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const layout = ({ children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <div className='absolute px-[40px] py-[20px] top-0 w-full flex justify-end items-center'>
        <button className='relative z-[999999]' onClick={onOpen}>
          <Image priority src={CloseSvg} width={25} height={25} alt='close' />
        </button>
      </div>
      {children}

      <Modal
        isOpen={isOpen}
        placement='center'
        onOpenChange={onOpenChange}
        className='w-4/5'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                이전으로
              </ModalHeader>
              <ModalBody>
                <p className='text-info'>
                  지금까지 작성하셨던 정보들은 모두 삭제됩니다
                </p>
                <p className='text-info'>홈화면으로 이동하시겠습니까?</p>
              </ModalBody>
              <ModalFooter>
                <button onClick={onClose} className='btn px-[20px] py-[5px]'>
                  취소
                </button>
                <button
                  onClick={() => {
                    router.replace('/');
                    dispatch(setStoreInitialize(true));
                  }}
                  className='full-btn px-[20px] py-[5px]'
                >
                  이동
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default layout;
