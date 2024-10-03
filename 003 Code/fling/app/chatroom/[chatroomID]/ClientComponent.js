'use client';

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea, Switch } from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import BottomInputNav from './BottomInputNav';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  addDoc,
} from 'firebase/firestore';
import { db, storage } from '../../../firebase/firebaseDB';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import { easeInOut } from 'framer-motion';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const ClientComponent = ({ currUser }) => {
  const [chatData, setChatData] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const {
    isOpen: isSubmitImgOpen,
    onOpen: onSubmitImgOpen,
    onOpenChange: onSubmitImgOpenChange,
  } = useDisclosure();

  const {
    isOpen: isViewImgOpen,
    onOpen: onViewImgOpen,
    onOpenChange: onViewImgOpenChange,
  } = useDisclosure();

  const [clickViewImgSrc, setClickViewImgSrc] = useState(null);

  const [message, setMessage] = useState('');
  const [isClickPlusBtn, setIsClickPlusBtn] = useState(false);
  const [isEnterSubmit, setIsEnterSubmit] = useState(false);

  const chatroomID = usePathname().split('/')[2];
  const chatRef = useRef();
  const bottomNavRef = useRef();

  useOnClickOutside(bottomNavRef, () => {
    setIsClickPlusBtn(false);
  });

  useEffect(() => {
    const messagesRef = collection(db, 'chatrooms', chatroomID, 'messages');
    const q = query(messagesRef, orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.message) {
          arr.push({
            date: data.date,
            message: data.message,
            email: data.email,
          });
        } else if (data.imgSrc) {
          arr.push({
            date: data.date,
            imgSrc: data.imgSrc,
            email: data.email,
          });
        }
      });
      setChatData(arr);
    });

    return () => unsub;
  }, []);

  useEffect(() => {
    if (imgFile) {
      onSubmitImgOpen();
    }
  }, [imgFile]);

  useEffect(() => {
    chatRef.current && chatRef.current.focus();
  }, [chatData]);

  const OtherChat = (message, imgSrc, currSecond) => {
    const date = currSecond.toDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    return (
      <div
        key={message + currSecond}
        className='w-full flex justify-start items-end gap-[10px] mb-[20px]'
      >
        {message && (
          <div
            className={`max-w-4/5 border border-main-red border-solid rounded-[15px] text-start px-[20px] py-[10px] bg-white relative`}
          >
            <span className='text-subtitle break-keep'>{message}</span>
          </div>
        )}
        {imgSrc && (
          <button
            onClick={() => {
              onViewImgOpen();
              setClickViewImgSrc(imgSrc);
            }}
            className='btn px-[20px] py-[10px] !rounded-[15px]'
          >
            📷 사진 보기
          </button>
        )}
        <span className='text-info'>{`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`}</span>
      </div>
    );
  };

  const MyChat = (message, imgSrc, currSecond) => {
    const date = currSecond.toDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    return (
      <div
        key={message + currSecond}
        className='w-full flex justify-end items-end gap-[10px] mb-[20px]'
      >
        <span className='text-info'>{`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`}</span>
        {message && (
          <div
            className={`max-w-4/5 border border-main-red border-solid bg-main-red rounded-[15px] text-start px-[20px] py-[10px] relative`}
          >
            <span className='text-subtitle break-keep text-white'>
              {message}
            </span>
          </div>
        )}
        {imgSrc && (
          <button
            onClick={() => {
              onViewImgOpen();
              setClickViewImgSrc(imgSrc);
            }}
            className='card-border px-[20px] py-[10px] rounded-[15px]'
          >
            📷 사진 보기
          </button>
        )}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    if (message !== '') {
      const docData = {
        email: currUser.email,
        message,
        date: new Date(),
      };

      await addDoc(collection(db, 'chatrooms', chatroomID, 'messages'), docData)
        .then(() => {
          setMessage('');
          chatRef.current && chatRef.current.focus();
        })
        .catch((err) => {
          alert('일시적인 오류로 전송하지 못하였습니다');
        });
    }
  };

  const handleKeyDown = (e) => {
    if (isEnterSubmit) {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    }
  };

  const handleImg = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.type.includes('svg')) {
        alert('svg 이미지 파일은 지원하지 않습니다');
        setImgFile(null);
        setImgUrl(null);
        return;
      }

      setImgUrl(URL.createObjectURL(file));
      setImgFile(file);
    } else {
      return;
    }
  };

  const handleImgSubmit = async (onClose) => {
    if (imgFile) {
      const storageRef = ref(
        storage,
        `images/${chatroomID}/${currUser.email}${new Date()}}`
      );
      await uploadBytes(storageRef, imgFile);
      const url = await getDownloadURL(storageRef);

      const docData = {
        email: currUser.email,
        imgSrc: url,
        date: new Date(),
      };

      await addDoc(collection(db, 'chatrooms', chatroomID, 'messages'), docData)
        .then(() => {
          setMessage('');
          chatRef.current && chatRef.current.focus();
        })
        .catch((err) => {
          alert('일시적인 오류로 전송하지 못하였습니다');
        });
    }
    setImgFile(null);
    setImgUrl(null);
    onClose();
  };

  return (
    <div className='w-full h-dvh bg-gray-50 relative flex flex-col'>
      <div className='w-full flex-1 overflow-y-scroll px-[40px] pt-[80px]'>
        {chatData.map((data) => {
          if (currUser.email === data.email) {
            return MyChat(data.message, data.imgSrc, data.date);
          } else {
            return OtherChat(data.message, data.imgSrc, data.date);
          }
        })}
        <div ref={chatRef} className='w-full h-[20px]' tabIndex={0}></div>
      </div>

      <motion.nav
        transition={easeInOut}
        ref={bottomNavRef}
        className='w-full h-fit bg-white flex flex-col gap-[20px] rounded-t-[15px] border-t-2 border-solid border-slate-200'
      >
        <div className='w-full h-fit flex justify-between items-center gap-[15px] px-[15px] py-[10px]'>
          <button
            className='size-[30px] relative'
            onClick={() => setIsClickPlusBtn((prev) => !prev)}
          >
            <Image src='/chatting/plus.svg' fill alt='plus' />
          </button>
          <Textarea
            minRows={1}
            maxRows={isEnterSubmit ? 1 : 2}
            classNames={{
              inputWrapper:
                'rounded-full px-[20px] bg-white border border-main-red border-solid shadow-none group-data-[focus=true]:bg-transparent data-[hover=true]:bg-transparent',
            }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyUp={handleKeyDown}
            placeholder='메세지를 입력하세요'
          />
          <button
            onClick={handleSubmit}
            type='submit'
            className='size-[30px] relative'
          >
            <Image src='/chatting/send.svg' fill alt='send' />
          </button>
        </div>

        <motion.div
          layout
          transition={
            {
              // type: 'spring',
              // stiffness: 700,
              // damping: 30,
            }
          }
          className='w-full h-fit px-[50px] bg-white'
        >
          {isClickPlusBtn && (
            // <AnimatePresence>
            <div className='w-full flex flex-col gap-[20px] mb-[50px]'>
              <div className='w-full flex gap-[20px]'>
                <input
                  id='input-image'
                  type='file'
                  accept='image/*'
                  onChange={handleImg}
                  className='full-btn w-[20px] aspect-square rounded-full hidden'
                />
                <label
                  htmlFor='input-image'
                  className='flex-1 full-btn aspect-square rounded-full cursor-pointer'
                >
                  이미지
                </label>
                <input
                  id='input-capture'
                  type='file'
                  capture
                  className='hidden'
                />
                <label
                  htmlFor='input-capture'
                  className='flex-1 full-btn aspect-square rounded-full'
                >
                  캡쳐
                </label>
                <button className='flex-1 full-btn aspect-square rounded-full'></button>
                <button className='flex-1 full-btn aspect-square rounded-full'></button>
              </div>
              <Switch
                isSelected={isEnterSubmit}
                onValueChange={setIsEnterSubmit}
                color='danger'
              >
                <span className='text-subtitle'>Enter키로 메세지 전송하기</span>
              </Switch>
            </div>
            // </AnimatePresence>
          )}
        </motion.div>
      </motion.nav>

      <Modal
        isOpen={isSubmitImgOpen}
        placement={'center'}
        onOpenChange={onSubmitImgOpenChange}
        className='w-4/5'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                이미지 전송하기
              </ModalHeader>
              <ModalBody>
                {imgUrl && (
                  <div className='w-full h-[350px] relative'>
                    <Image
                      src={imgUrl}
                      fill
                      className='object-contain'
                      alt={imgFile.name}
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <button
                  onClick={() => {
                    onClose();
                    setImgFile(null);
                    setImgUrl(null);
                  }}
                  className='btn px-[20px] py-[5px]'
                >
                  취소
                </button>
                <button
                  onClick={() => handleImgSubmit(onClose)}
                  className='full-btn px-[20px] py-[5px]'
                >
                  전송
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isViewImgOpen}
        placement={'center'}
        onOpenChange={onViewImgOpenChange}
        className='w-4/5'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>이미지</ModalHeader>
              <ModalBody>
                {clickViewImgSrc && (
                  <div className='w-full h-[350px] relative'>
                    <Image
                      src={clickViewImgSrc}
                      fill
                      className='object-contain'
                      alt={clickViewImgSrc}
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <button
                  onClick={onClose}
                  className='full-btn px-[20px] py-[5px]'
                >
                  닫기
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* <BottomInputNav
          isClickPlusBtn={isClickPlusBtn}
          setIsClickPlusBtn={setIsClickPlusBtn}
          plusBtnRef={plusBtnRef}
          chatroomID={chatroomID}
          currUser={currUser}
        /> */}
    </div>
  );
};

export default ClientComponent;

const InputNav = styled.div``;
