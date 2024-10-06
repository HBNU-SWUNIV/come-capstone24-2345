'use client';

import axios from 'axios';
import { setStoreEmailCert } from '../../../library/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

const RegisterEmail = () => {
  const [inputValue, setInputValue] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [timer, setTimer] = useState(150);
  const [isRequest, setIsRequest] = useState(false);

  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.registerUserInfo.email);
  const userEmailCert = useSelector(
    (state) => state.registerUserInfo.emailCert
  );
  const router = useRouter();

  const sendEmailCode = async () => {
    try {
      const result = await axios.post('/api/register/emailCode', {
        email: userEmail,
      });
      setEmailCode(result.data);
    } catch (err) {
      if (err.response.request.status === 400) {
        alert(err.response.data);
        router.replace('/');
      } else if (err.response.request.status === 500) {
        alert('잠시 후에 다시 시도해주세요');
      }
    }
  };

  useEffect(() => {
    let interval;
    setTimer(150);
    if (isRequest) {
      sendEmailCode();
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRequest(false);
            setEmailCode('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRequest]);

  useEffect(() => {
    if (inputValue === '') {
      setIsInvalidCode(false);
    }
  }, [inputValue]);

  const min = Math.floor(timer / 60);
  const sec = timer % 60;

  const handleReqCode = () => {
    onOpen();
    setIsRequest(true);
  };

  const handleReReqCode = () => {
    setIsRequest(true);
  };

  useEffect(() => {
    if (userEmail && userEmailCert) {
      router.replace('/register/user');
    }
  }, [userEmail, userEmailCert]);

  const handleSubmit = () => {
    if (emailCode !== '' && inputValue === emailCode) {
      setIsLoading(true);
      setIsInvalidCode(false);
      dispatch(setStoreEmailCert(true));
    } else {
      setIsInvalidCode(true);
    }
  };

  return (
    <div className='w-full h-dvh px-[40px] pt-[80px] pb-[120px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='text-start w-4/5 flex flex-col gap-[10px]'>
          <p className='text-title text-main-red'>인증번호 전송</p>
          <div className='text-gray-500'>
            <p className='text-subtitle break-keep'>신청하셨던 이메일로</p>
            <p className='text-subtitle break-keep'>
              인증코드를 전송해 드릴게요
            </p>
          </div>
        </div>

        <button
          onClick={handleReqCode}
          className={`absolute bottom-[-80px] w-full left-0 full-btn h-[50px] content-center`}
        >
          {isRequest ? '전송완료' : '인증코드 요청'}
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        placement='center'
        className='w-4/5'
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                인증번호 입력
              </ModalHeader>
              <ModalBody>
                <Input
                  variant='bordered'
                  isRequired
                  label='인증코드'
                  value={inputValue}
                  onValueChange={setInputValue}
                  isInvalid={isInvalidCode}
                  errorMessage='인증코드가 맞지 않습니다'
                  labelPlacement='inside'
                  description='대/소문자 정확하게 구분하여 기입해주세요'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      {isRequest && (
                        <span className='text-info text-main-red'>
                          0{min}:{sec < 10 ? `0${sec}` : sec}
                        </span>
                      )}
                    </div>
                  }
                  closeButton={<></>}
                  classNames={{
                    inputWrapper: 'border border-solid border-slate-200',
                    description: 'text-start',
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <button
                  disabled={isRequest ? true : false}
                  className={`${isRequest ? 'btn text-gray-200' : 'focus-btn'} px-[20px] py-[5px]`}
                  onClick={handleReReqCode}
                >
                  인증코드 재요청
                </button>
                <button
                  disabled={inputValue === '' && isRequest ? true : false}
                  className={`${inputValue === '' && isRequest ? 'btn' : 'full-btn'} px-[20px] py-[5px]`}
                  onClick={handleSubmit}
                >
                  {isLoading ? '확인중' : '확인'}
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RegisterEmail;
