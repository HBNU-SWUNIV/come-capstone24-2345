'use client';

import { useSession } from 'next-auth/react';
import HeaderComponent from './HeaderComponent';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import styled from 'styled-components';

const MainPage = () => {
  const [userInfo, setUserInfo] = useState();
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (status === 'authenticated') {
      setUserInfo(session.user);
    }
  }, [session, status]);

  return (
    <>
      <HeaderComponent pageName='홈' />
      {userInfo && (
        <>
          <Modal
            className='w-4/5'
            isOpen={isOpen}
            placement='center'
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className='flex flex-col gap-1'>
                    오늘의 연애 운세
                  </ModalHeader>
                  <ModalBody>
                    <p>1</p>
                    <p>2</p>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={onClose}
                      className='full-btn px-[20px] py-[5px]'
                    >
                      확인
                    </button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <div className='w-full h-dvh bg-zinc-50 px-[40px] pt-[60px] text-start'>
            <div className='w-full h-[calc(100vh_-_140px)] py-[20px] flex flex-col gap-[20px] overflow-y-scroll'>
              <div className='flex flex-col'>
                <span>🏫 {userInfo.univ}</span>
                <div className='w-full h-[300px] flex gap-[20px] items-end'>
                  <div className='flex-1 h-1/2 relative'>
                    <Image src='/main/dog.svg' fill alt='shiba-inu' />
                  </div>
                  <Chat className='w-4/6 h-full flex flex-col justify-between bg-white rounded-[15px] p-[20px]'>
                    <span>안녕하세요 {userInfo.nickname}님!</span>
                    <button
                      onClick={onOpen}
                      className='full-btn py-[10px] w-full'
                    >
                      운세 확인
                    </button>
                  </Chat>
                </div>
              </div>

              <div className='w-full flex flex-col gap-[20px]'>
                <span>자주 묻는 질문들</span>
                <Accordion
                  variant='splitted'
                  isCompact
                  className='w-full !px-0'
                  itemClasses={{
                    base: 'bg-white rounded-[15px] mb-[5px] !px-0 !shadow-none',
                    trigger: 'px-[20px]',
                    title: 'text-subtitle',
                    content: 'text-info px-[20px] pb-[20px] break-keep',
                  }}
                >
                  <AccordionItem
                    key='1'
                    aria-label='Accordion 1'
                    title='매칭은 어떤 방식으로 되는건가요?'
                  >
                    남자그룹, 여자그룹 각각 Fisher-Yates Shuffle 알고리즘을
                    이용하여 섞고 각 인덱스별로 일대일 매칭하는 방식을
                    이용합니다
                  </AccordionItem>
                  <AccordionItem
                    key='2'
                    aria-label='Accordion 2'
                    title='이번주 신청한 유저는 몇 명인가요?'
                  >
                    2
                  </AccordionItem>
                  <AccordionItem
                    key='3'
                    aria-label='Accordion 3'
                    title='이번주 선정된 유저는 몇 명인가요?'
                  >
                    3
                  </AccordionItem>
                </Accordion>
              </div>

              <div className='w-full flex flex-col gap-[20px]'>
                <span>플링 사용 후기</span>
                <div className='w-full h-[100px] rounded-[15px] bg-white'></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainPage;

const Chat = styled.div``;

const Bubble = styled(Chat)`
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 14px solid transparent;
    border-right-color: #000000;
    border-left: 0;
    border-bottom: 0;
    margin-top: -7px;
    margin-left: -14px;
  }
`;
