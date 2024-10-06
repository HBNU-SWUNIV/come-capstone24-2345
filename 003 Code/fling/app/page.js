'use client';

import Link from 'next/link';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Divider } from '@nextui-org/divider';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MainSlider from './MainSlider';
import InstallPrompt from './InstallPrompt';
import axios from 'axios';

const StartPage = () => {
  const [isClickInstallBtn, setIsClickInstallBtn] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [gender, setGender] = useState('man');
  const [email, setEmail] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmit(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    await axios
      .post('/api/apply/form', { email, gender })
      .then((res) => {
        setIsSubmit(true);
        setGender('man');
        setEmail('');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div className='w-full h-screen px-[40px] relative'>
      <header className='absolute w-full h-[100px] flex justify-between items-center px-[30px] py-[25px] z-[9999] left-0'>
        <Image src='/main-logo.svg' alt='main-logo' width={100} height={50} />
        <div className='flex h-[20px] gap-[10px] items-center'>
          <button
            onClick={() => {
              setIsClickInstallBtn(true);
            }}
            className={`text-info text-main-red`}
          >
            인앱 설치
          </button>
          <Divider orientation='vertical' />
          <button
            onClick={() => {
              onOpen();
            }}
            className='text-info text-main-red'
          >
            코드 신청
          </button>
        </div>
      </header>

      <InstallPrompt
        isClickInstallBtn={isClickInstallBtn}
        setIsClickInstallBtn={setIsClickInstallBtn}
      />

      <Modal
        className='w-4/5 z-[99999]'
        isOpen={isOpen}
        placement='center'
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {isSubmit ? '제출 완료' : '사용 신청'}
              </ModalHeader>
              <ModalBody className='text-info'>
                {isSubmit ? (
                  <>
                    <p>정상적으로 제출되었어요!</p>
                    <p>선정되시면 해당 이메일로 이벤트 코드를 전송해드려요</p>
                    <p>코드는 매주 월요일 오전 9시 10분에 전송합니다</p>
                  </>
                ) : (
                  <>
                    <p>플링에 오신 것을 환영해요!</p>
                    <p>이벤트 코드를 받으신 분만 저희 웹앱에 가입이 가능해요</p>
                    <p>아래에 학교 이메일과 성별을 작성해주세요</p>
                    <p>성별은 변경할 수 없으니 정확하게 기입해주세요</p>
                    <p className='text-main-red'>
                      현재는 한밭대학교 학생을 대상으로만 서비스 진행
                    </p>
                    <Divider className='my-2' />
                    <RadioGroup
                      label='성별'
                      orientation='horizontal'
                      value={gender}
                      color='danger'
                      onValueChange={setGender}
                      classNames={{
                        wrapper: 'w-full flex justify-around',
                      }}
                    >
                      <Radio
                        classNames={{
                          label: '!text-subtitle',
                          wrapper: '!size-[15px]',
                          control: '!size-[5px]',
                        }}
                        value='man'
                      >
                        남학생
                      </Radio>
                      <Radio
                        classNames={{
                          label: '!text-subtitle',
                          wrapper: '!size-[15px]',
                          control: '!size-[5px]',
                        }}
                        value='woman'
                      >
                        여학생
                      </Radio>
                    </RadioGroup>
                    <Input
                      isRequired
                      type='email'
                      label='Email'
                      placeholder='abc@univ.ac.kr'
                      variant='underlined'
                      className='max-w-xs'
                      value={email}
                      onValueChange={setEmail}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {isSubmit ? (
                  <button
                    onClick={() => {
                      onClose();
                    }}
                    className='w-full h-[50px] full-btn'
                  >
                    확인
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className='w-full h-[50px] full-btn'
                  >
                    제출하기
                  </button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className='size-full flex flex-col justify-center items-center relative'>
        <div className='w-full min-h-[300px] h-1/2 relative top-[-50px] flex flex-col justify-evenly items-center'>
          <MainSlider />
        </div>

        <div className='w-full absolute bottom-[50px]'>
          <button className='w-full h-[60px] my-[20px] rounded-[15px] bg-main-red text-white'>
            <Link
              href='/register/code'
              className='size-full flex justify-center items-center'
            >
              플링 시작하기
            </Link>
          </button>

          <div className='w-full flex justify-center text-subtitle'>
            <p>이미 계정이 있으신가요?</p>
            <Link className='ml-[10px] text-main-red' href={'/login'}>
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
