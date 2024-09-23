'use client';

import React, { useState, useEffect } from 'react';
import { Switch } from '@nextui-org/switch';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { signOut, useSession } from 'next-auth/react';
import { Textarea } from '@nextui-org/react';
import { Divider } from '@nextui-org/divider';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SettingPage = () => {
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');
  const [userInfo, setUserInfo] = useState();
  const [isAlreadyWithdraw, setIsAlreadyWithdraw] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      setUserInfo({
        email: session.user.email,
        nickname: session.user.nickname,
      });
    }
  }, [session, status]);

  const handleInquiry = async () => {
    await axios
      .post('/api/setting/inquiry', {
        email: userInfo.email,
        nickname: userInfo.nickname,
        inquiryTitle,
        inquiryContent,
      })
      .then((res) => {
        if (res.status === 200) {
          alert('정상적으로 처리되었습니다!');
          setInquiryTitle('');
          setInquiryContent('');
        }
      })
      .catch((err) => {
        alert(err.response.data);
        setInquiryTitle('');
        setInquiryContent('');
      });
  };

  const handleWithdraw = async (closeModal) => {
    if (isAlreadyWithdraw) {
      router.replace('/');
      signOut();
    } else {
      await axios
        .post('/api/setting/withdraw', { email: userInfo.email })
        .then((res) => {
          setIsAlreadyWithdraw(true);
          closeModal();
          onOpen();
        });
    }
  };

  return (
    <div className='w-full h-screen px-[40px] pt-[80px] flex flex-col gap-[10px] text-start bg-gray-100'>
      <Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange}>
        <ModalContent className='w-4/5'>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {isAlreadyWithdraw ? '탈퇴 완료' : '정말 탈퇴하실 건가요?'}
              </ModalHeader>
              <ModalBody className='text-info gap-[5px]'>
                {isAlreadyWithdraw ? (
                  <>
                    <p>정상적으로 삭제되었습니다.</p>
                    <p>이용해 주셔서 감사합니다.</p>
                  </>
                ) : (
                  <>
                    <p>회원님의 채팅내역 및 모든 정보들은 삭제됩니다.</p>
                    <p>플링을 다시 이용하시려면 재신청을 해아합니다.</p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {!isAlreadyWithdraw && (
                  <button onClick={onClose} className='btn px-[20px] py-[5px]'>
                    취소
                  </button>
                )}
                <button
                  onClick={() => {
                    handleWithdraw(onClose);
                  }}
                  className='full-btn px-[20px] py-[5px]'
                >
                  확인
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className='flex justify-between items-center px-[20px] py-[10px] bg-white rounded-[15px]'>
        <div className='flex flex-col gap-[5px]'>
          <span>채팅 알림</span>
          <span className='text-info text-gray-500'>PUSH 알림 기능 on/off</span>
        </div>
        <Switch
          aria-label='채팅 알림'
          color='danger'
          classNames={{
            wrapper: 'm-0',
          }}
        />
      </div>

      <button className='flex flex-col px-[20px] py-[10px] bg-white rounded-[15px]'>
        <div className='flex flex-col text-start gap-[5px]'>
          <span>Q&A</span>
          <span className='text-info text-gray-500'>
            회원님들의 문의 내역들
          </span>
        </div>
      </button>

      <Accordion isCompact className='px-0 w-full'>
        <AccordionItem
          key='1'
          aria-label='문의하기'
          title='문의하기'
          className='relative'
          classNames={{
            base: 'bg-white px-[20px] py-[10px] rounded-[15px]',
            title: '',
            content: 'bg-white text-info p-0 rounded-[15px]',
          }}
        >
          <Textarea
            variant='bordered'
            label='제목'
            maxRows={1}
            value={inquiryTitle}
            onValueChange={setInquiryTitle}
            classNames={{
              inputWrapper: 'rounded-0 shadow-none',
              input: 'pr-[30px]',
            }}
          />
          <Divider />
          <Textarea
            variant='bordered'
            label='문의하실 내용'
            minRows={1}
            maxRows={5}
            value={inquiryContent}
            onValueChange={setInquiryContent}
            classNames={{
              inputWrapper: 'rounded-0 shadow-none',
              input: 'pr-[20px]',
            }}
          />
          <Image
            onClick={handleInquiry}
            className='absolute bottom-[20px] right-[20px] cursor-pointer'
            src='/main/setting/send.svg'
            width={25}
            height={25}
            alt='send'
          />
        </AccordionItem>
      </Accordion>

      <button className='flex flex-col px-[20px] py-[10px] bg-white rounded-[15px]'>
        <div className='flex flex-col text-start gap-[5px]'>
          <span className='text-gray-700'>버전</span>
          <span className='text-info text-gray-500'>v1.0.0</span>
        </div>
      </button>

      <div className='w-full flex px-[20px] py-[10px] justify-around items-center text-info text-gray-500'>
        <button
          className='underline'
          onClick={() => {
            signOut();
            router.replace('/');
          }}
        >
          로그아웃
        </button>
        <button className='underline' onClick={onOpen}>
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
