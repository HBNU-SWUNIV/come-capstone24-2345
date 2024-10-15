'use client';

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import deleteAccountHandler from '../../../hooks/deleteAccount';
import React, { useEffect, useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea, Switch } from '@nextui-org/react';
import { CheckboxGroup, Checkbox } from '@nextui-org/react';
import { Spinner } from '@nextui-org/spinner';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  addDoc,
} from 'firebase/firestore';
import { db, storage } from '../../../firebase/firebaseDB';
import imageCompression from 'browser-image-compression';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import ImgSvg from './../../../public/chatroom/image.svg';
import CameraSvg from './../../../public/chatroom/camera.svg';
import ReportSvg from './../../../public/chatroom/report.svg';
import OutRoomSvg from './../../../public/chatroom/out-room.svg';
import axios from 'axios';
// import { sendNotification } from '@/hooks/notifications';
import setActiveChatroom from './setActiveChatroom';

const ClientComponent = ({ currUser }) => {
  const [chatData, setChatData] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoadingImgSubmit, setIsLoadingImgSubmit] = useState(false);
  const {
    isOpen: isSubmitImgOpen,
    onOpen: onSubmitImgOpen,
    onOpenChange: onSubmitImgOpenChange,
  } = useDisclosure();

  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onOpenChange: onReportOpenChange,
  } = useDisclosure();

  const {
    isOpen: isRoomOutOpen,
    onOpen: onRoomOutOpen,
    onOpenChange: onRoomOutOpenChange,
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
  const [reportOptions, setReportOptions] = useState([]);
  const [reportEtc, setReportEtc] = useState('');
  const [isSubmitReport, setIsSubmitReport] = useState(false);
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);

  const pathname = usePathname();
  const chatroomID = usePathname().split('/')[2];
  const chatRef = useRef();
  const inputRef = useRef();
  const bottomNavRef = useRef();
  const router = useRouter();

  useOnClickOutside(bottomNavRef, () => {
    setIsClickPlusBtn(false);
  });

  useEffect(() => {
    if (typeof window != 'undefined') {
      const localStorageEnterSubmit = localStorage.getItem('isEnterSubmit');
      if (localStorageEnterSubmit !== null) {
        const data = JSON.parse(localStorageEnterSubmit);
        if (data.email === currUser.email) {
          setIsEnterSubmit(data.state);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (currUser) {
      const fetchOtherUserCheck = async () => {
        try {
          await axios.post('/api/group/otherUserInfo', {
            email: currUser.email,
          });
        } catch (err) {
          if (err.response.data.type === 'USER_WITHDRAW') {
            alert(err.response.data.message);
            router.replace('/main/home');
            return;
          }
          if (err.response.data.type === 'NOT_REGISTER') {
            alert(err.response.data.message);
            router.replace('/main/chat');
            return;
          }
        }
      };
      fetchOtherUserCheck();
    }
  }, [currUser]);

  useEffect(() => {
    const messagesRef = collection(db, 'chatrooms', chatroomID, 'messages');
    const q = query(messagesRef, orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setChatData([]);
      } else {
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

        const newMessage =
          querySnapshot.docs[querySnapshot.docs.length - 1].data();

        // axios
        //   .post('/api/chat/notification', { message: newMessage, chatroomID })
        //   .then((res) => {});
        // if (document.visibilityState === 'hidden') {
        //   // 새로운 메시지가 있을 때만 알림 전송
        //   const newMessage = arr[arr.length - 1];
        //   if (newMessage.message) {
        //     sendNotification(newMessage.message);
        //   } else {
        //     sendNotification('사진을 보냈습니다');
        //   }
        // }
      }
    });

    setActiveChatroom(currUser.email, true);

    return () => unsub;
  }, [chatroomID]);

  useEffect(() => {
    const handleVisbility = async () => {
      if (document.visibilityState === 'hidden') {
        await setActiveChatroom(currUser.email, false);
      } else if (document.visibilityState === 'visible') {
        await setActiveChatroom(currUser.email, true);
      }
    };
    window.addEventListener('visibilitychange', handleVisbility);
    return () =>
      window.removeEventListener('visibilitychange', handleVisbility);
  }, []);

  useEffect(() => {
    if (imgFile) {
      onSubmitImgOpen();
    }
  }, [imgFile]);

  useEffect(() => {
    if (!isReportOpen) {
      setReportOptions([]);
      setReportEtc('');
      setIsSubmitReport(false);
    }
  }, [isReportOpen]);

  useEffect(() => {
    chatRef.current && chatRef.current.focus();
  }, [chatData]);

  const OtherChat = (message, imgSrc, currSecond) => {
    const date = currSecond.toDate();
    const year = date.getFullYear().toString().slice(2);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();

    return (
      <div
        key={message + currSecond}
        className='w-full flex justify-start items-end gap-[10px] mb-[20px]'
      >
        {message && (
          <div
            className={`max-w-4/5 card-border rounded-medium text-start px-[20px] py-[10px] bg-white relative`}
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
            className='btn px-[20px] py-[10px] !rounded-full bg-white'
          >
            📷 사진 보기
          </button>
        )}
        <div className='text-info text-start '>
          <p className='text-gray-400'>{`${year}.${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`}</p>
          <p className='text-gray-600'>
            {`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`}
          </p>
        </div>
      </div>
    );
  };

  const MyChat = (message, imgSrc, currSecond) => {
    const date = currSecond.toDate();
    const year = date.getFullYear().toString().slice(2);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    return (
      <div
        key={message + currSecond}
        className='w-full flex justify-end items-end gap-[10px] mb-[20px]'
      >
        <div className='text-info text-end '>
          <p className='text-gray-400'>{`${year}.${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`}</p>
          <p className='text-gray-600'>
            {`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`}
          </p>
        </div>
        {message && (
          <div
            className={`max-w-4/5 border border-main-red border-solid bg-main-red rounded-medium text-start px-[20px] py-[10px] relative`}
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
            // className='card-border px-[20px] py-[10px] rounded-[15px]'
            className='full-btn px-[20px] py-[10px] !rounded-full'
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
          inputRef.current && inputRef.current.focus();
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
      let file = e.target.files[0];
      setImgUrl(URL.createObjectURL(file));
      setImgFile(file);
    } else {
      return;
    }
  };

  const handleImgSubmit = async (onClose) => {
    setIsLoadingImgSubmit(true);
    if (imgFile) {
      const compressedImgBlob = await imageCompression(imgFile, {
        maxSizeMB: 1,
      });
      const compressedImgFile = new File([compressedImgBlob], imgFile.name, {
        type: imgFile.type,
      });

      const storageRef = ref(
        storage,
        `images/${chatroomID}/${currUser.email}${new Date()}}`
      );
      await uploadBytes(storageRef, compressedImgFile);
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
          inputRef.current && inputRef.current.focus();
          setIsLoadingImgSubmit(false);
        })
        .catch((err) => {
          setIsLoadingImgSubmit(false);
          alert('일시적인 오류로 전송하지 못하였습니다');
        });
    }
    setImgFile(null);
    setImgUrl(null);
    onClose();
  };

  const handleReport = async () => {
    await axios
      .post('/api/chat/report', {
        options: reportOptions,
        etc: reportEtc,
        email: currUser.email,
      })
      .then(() => {
        setIsSubmitReport(true);
        setReportOptions([]);
        setReportEtc('');
      });
  };

  const handleRoomOut = async () => {
    if (currUser) {
      setIsLoadingWithdraw(true);
      deleteAccountHandler(currUser.email)
        .then(async () => {
          setIsLoadingWithdraw(false);
          onRoomOutOpenChange(false);
          await signOut();
          router.replace('/');
        })
        .catch((err) => {
          setIsLoadingWithdraw(false);
          onRoomOutOpenChange(false);
          console.log(err);
        });
    }
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
        <div
          ref={chatRef}
          className='w-full h-[20px] focus:outline-none'
          tabIndex={0}
        ></div>
      </div>

      <motion.nav
        // layout
        ref={bottomNavRef}
        className='w-full h-fit bg-white flex flex-col gap-[20px] rounded-t-[15px] border-t-1 border-solid border-slate-200'
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
            onClick={() => setIsClickPlusBtn(false)}
            placeholder='메세지를 입력하세요'
            ref={inputRef}
          />
          <button
            onClick={handleSubmit}
            type='submit'
            className='size-[30px] relative'
          >
            <Image src='/chatting/send.svg' fill alt='send' />
          </button>
        </div>

        <motion.div className='w-full h-fit px-[50px] bg-white'>
          {isClickPlusBtn && (
            <div className='w-full flex flex-col gap-[20px] mb-[50px] items-center'>
              <div className='w-full flex justify-around'>
                <input
                  id='input-image'
                  type='file'
                  accept='image/jpeg, image/png, image/webp, image/bmp'
                  onChange={handleImg}
                  hidden
                />
                <label
                  htmlFor='input-image'
                  className='flex-1 flex flex-col justify-center items-center gap-[10px] cursor-pointer'
                >
                  <Image
                    src={ImgSvg}
                    width={30}
                    height={30}
                    alt='image'
                    className='full-btn p-[10px] box-content'
                  />
                  <span className='text-info'>이미지</span>
                </label>
                <input
                  id='input-image'
                  type='file'
                  accept='image/jpeg, image/png, image/webp, image/bmp'
                  onChange={handleImg}
                  hidden
                  capture='user'
                />
                <label
                  htmlFor='input-image'
                  className='flex-1 flex flex-col justify-center items-center gap-[10px] cursor-pointer'
                >
                  <Image
                    src={CameraSvg}
                    width={30}
                    height={30}
                    alt='image'
                    className='full-btn p-[10px] box-content'
                  />
                  <span className='text-info'>카메라</span>
                </label>
                <button
                  onClick={onReportOpen}
                  className='flex-1 flex flex-col justify-center items-center gap-[10px]'
                >
                  <Image
                    src={ReportSvg}
                    width={30}
                    height={30}
                    alt='report'
                    className='full-btn p-[10px] box-content'
                  />
                  <span className='text-info'>신고하기</span>
                </button>
                <button
                  onClick={onRoomOutOpen}
                  className='flex-1 flex flex-col justify-center items-center gap-[10px]'
                >
                  <Image
                    src={OutRoomSvg}
                    width={30}
                    height={30}
                    alt='out-room'
                    className='full-btn p-[10px] box-content'
                  />
                  <span className='text-info'>나가기</span>
                </button>
              </div>
              <Switch
                isSelected={isEnterSubmit}
                onValueChange={(value) => {
                  setIsEnterSubmit(value);
                  setIsEnterSubmit(value);
                  localStorage.setItem(
                    'isEnterSubmit',
                    JSON.stringify({ email: currUser.email, state: value })
                  );
                }}
                color='danger'
              >
                <span className='text-subtitle'>Enter키로 메세지 전송하기</span>
              </Switch>
            </div>
          )}
        </motion.div>
      </motion.nav>

      {/* 이미지 전송하는 모달창 */}
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
                  <div className='w-full h-[300px] relative'>
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
                  onClick={() => {
                    handleImgSubmit(onClose);
                  }}
                  className='full-btn px-[20px] py-[5px] flex justify-center items-center'
                >
                  {isLoadingImgSubmit ? (
                    <Spinner
                      size='sm'
                      classNames={{
                        circle1: 'border-b-white',
                        circle2: 'border-b-white',
                      }}
                    />
                  ) : (
                    '전송'
                  )}
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* 유저가 보낸 이미지 보는 모달창 */}
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
                  <div className='w-full h-[300px] relative'>
                    <Image
                      src={clickViewImgSrc}
                      fill
                      className='object-contain'
                      alt={clickViewImgSrc}
                      // priority
                      placeholder='blur'
                      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=='
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

      {/* 신고하기 모달창 */}
      <Modal
        isOpen={isReportOpen}
        placement={'center'}
        onOpenChange={onReportOpenChange}
        className='w-4/5'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                신고하기
              </ModalHeader>
              <ModalBody>
                {isSubmitReport ? (
                  <p className='text-info'>정상적으로 제출되었습니다</p>
                ) : (
                  <>
                    <CheckboxGroup
                      color='danger'
                      value={reportOptions}
                      onValueChange={setReportOptions}
                      className='text-info'
                    >
                      <Checkbox value='부적절한 메세지'>
                        <p>부적절한 메세지</p>
                        <p className='text-info text-gray-500'>
                          욕설, 외설적인 내용 또는 불쾌감을 주는 메시지
                        </p>
                      </Checkbox>
                      <Checkbox value='욕설 및 혐오발언'>
                        <p>차별 또는 혐오 발언</p>
                        <p className='text-info text-gray-500'>
                          인종, 성별, 종교, 성적 지향 등에 대한 차별이나 혐오
                          표현
                        </p>
                      </Checkbox>
                      <Checkbox value='부적절한 닉네임'>
                        <p>부적절한 닉네임</p>
                        <p className='text-info text-gray-500'>
                          욕설, 성적인 표현, 혐오 표현 등이 포함된 닉네임
                        </p>
                      </Checkbox>
                      <Checkbox value='부적절한 프로필'>
                        <p>부적절한 프로필</p>
                        <p className='text-info text-gray-500'>
                          적절하지 않은 이미지를 프로필로 사용
                        </p>
                      </Checkbox>
                    </CheckboxGroup>
                    <span className='text-info text-main-red underline'>
                      * 신고 시 채팅내역을 검수합니다
                    </span>
                    <Textarea
                      label='기타'
                      minRows={1}
                      maxRows={2}
                      value={reportEtc}
                      onValueChange={setReportEtc}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <button onClick={onClose} className='btn px-[20px] py-[5px]'>
                  닫기
                </button>
                {!isSubmitReport && (
                  <button
                    onClick={() => {
                      handleReport(onClose);
                    }}
                    className='full-btn px-[20px] py-[5px]'
                  >
                    제출
                  </button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* 채팅방 나가기 모달창 */}
      <Modal
        isOpen={isRoomOutOpen}
        placement={'center'}
        onOpenChange={onRoomOutOpenChange}
        className='w-4/5'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                채팅방 나가기
              </ModalHeader>
              <ModalBody className='text-info'>
                <p>채팅방을 나가시면 모든 대화내역이 사라집니다</p>
                <p>또한 계정도 삭제되며, 해당 서비스를 이용할 수 없습니다</p>
                <p>사용신청을 다시하여 선정되어야 사용가능합니다</p>
              </ModalBody>
              <ModalFooter>
                {isLoadingWithdraw ? (
                  <button className='full-btn px-[20px] py-[5px] flex justify-center items-center'>
                    <Spinner
                      size='sm'
                      classNames={{
                        circle1: 'border-b-white',
                        circle2: 'border-b-white',
                      }}
                    />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={onClose}
                      className='btn px-[20px] py-[5px]'
                    >
                      취소
                    </button>
                    <button
                      onClick={handleRoomOut}
                      className='full-btn px-[20px] py-[5px]'
                    >
                      나가기
                    </button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ClientComponent;
