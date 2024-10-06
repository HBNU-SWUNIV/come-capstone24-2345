'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, DatePicker } from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { setStoreBirth, setStoreName } from '../../../library/store';

const CodePage = () => {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState();
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const userName = useSelector((state) => state.registerUserInfo.name);
  const userBirth = useSelector((state) => state.registerUserInfo.birth);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userName && userBirth) {
      router.replace('/register/univ');
    }
  }, [userName, userBirth]);

  const handleSubmit = async () => {
    try {
      if (birth) {
        const birthObj = {
          year: birth.year,
          month: birth.month,
          day: birth.day,
        };
        const result = await axios.post('/api/register/user', {
          name,
          birth: birthObj,
        });

        const user = result.data;
        setLoading(true);
        dispatch(setStoreName(user.name));
        dispatch(setStoreBirth(user.birth));
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
  return (
    <div className='w-full h-screen px-[40px] pt-[80px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='text-start w-3/5 flex flex-col gap-[10px]'>
          <p className='text-title text-main-red'>기본 정보</p>
          <p className='text-subtitle break-keep text-gray-500'>
            회원님의 이름과 생년월일을 입력해주세요
          </p>
        </div>

        <Input
          variant='bordered'
          isRequired
          label='이름'
          value={name}
          onValueChange={setName}
          classNames={{
            inputWrapper: 'border border-solid border-slate-200',
          }}
        />

        <button onClick={onOpen}>
          <Input
            variant='bordered'
            isRequired
            label='생년월일'
            value={birth}
            disabled
            onValueChange={setBirth}
            className='pointer-events-none'
            classNames={{
              inputWrapper: 'border border-solid border-slate-200',
            }}
          />
        </button>

        <button
          onClick={handleSubmit}
          disabled={name !== '' && birth ? false : true}
          className={`absolute bottom-[40px] left-0 ${name !== '' && birth ? 'full-btn' : 'btn'} w-full h-[50px] content-center cursor-pointer`}
        >
          {isLoading ? '확인중...' : '다음'}
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        placement='bottom-center'
        onOpenChange={onOpenChange}
        className='w-4/5'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                생년월일
              </ModalHeader>
              <ModalBody>
                <DatePicker
                  label='생년월일'
                  variant='bordered'
                  showMonthAndYearPickers
                  value={birth}
                  onChange={setBirth}
                  color='danger'
                />
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
    </div>
  );
};

export default CodePage;
