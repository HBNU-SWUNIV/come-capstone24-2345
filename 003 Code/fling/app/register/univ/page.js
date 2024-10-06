'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

import Image from 'next/image';
import { setStoreDepartment, setStoreUniv } from '../../../library/store';

const RegisterUniv = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [univList, setUnivList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [searchUniv, setSearchUniv] = useState('');
  const [searchUnivResult, setSearchUnivResult] = useState([]);
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchDepartmentResult, setSearchDepartmentResult] = useState([]);
  const {
    isOpen: isUnivOpen,
    onOpen: onUnivOpen,
    onOpenChange: onUnivOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDepartmentOpen,
    onOpen: onDepartmentOpen,
    onOpenChange: onDepartmentOpenChange,
  } = useDisclosure();

  const [univ, setUniv] = useState('');
  const [department, setDepartment] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const userUniv = useSelector((state) => state.registerUserInfo.univ);
  const userDepartment = useSelector(
    (state) => state.registerUserInfo.department
  );

  useEffect(() => {
    const fetchUnivList = async () => {
      await axios('/23년_대학명_및_학과명_리스트.csv').then((result) => {
        let csvFile = result.data;
        let splitRow = csvFile.split('\r\n');
        splitRow.shift();
        splitRow = splitRow.map((element) => {
          return element.split(',');
        });

        const univ_department = {};
        splitRow.forEach((item) => {
          let univName = item[0];
          let depart = item[4];
          if (!univ_department[univName]) {
            univ_department[univName] = [];
          }
          univ_department[univName].push(depart);
        });

        setUnivList(
          Object.keys(univ_department).sort((a, b) =>
            a.localeCompare(b, 'ko-KR')
          )
        );
        setDepartmentList(univ_department);
      });
    };

    fetchUnivList();
  }, []);

  useEffect(() => {
    const result = univList.filter((univ) => univ.includes(searchUniv));
    setSearchUnivResult(result);
  }, [searchUniv]);

  useEffect(() => {
    if (univ) {
      const result = departmentList[univ].filter((depart) =>
        depart.includes(searchDepartment)
      );
      setSearchDepartmentResult(result);
    }
  }, [univ, searchDepartment]);

  useEffect(() => {
    if (userUniv && userDepartment) {
      router.replace('/register/photo');
    }
  }, [userUniv, userDepartment]);

  const handleSubmit = () => {
    if (univ && department) {
      setIsLoading(true);
      dispatch(setStoreUniv(univ));
      dispatch(setStoreDepartment(department));
    } else {
      alert('대학명과 학과명을 기입해주세요');
    }
  };

  return (
    <div className='w-full h-screen px-[40px] pt-[80px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='text-start w-3/5 flex flex-col gap-[10px]'>
          <p className='text-title text-main-red'>대학교</p>
          <p className='text-subtitle break-keep text-gray-500'>
            현재 재학중인 대학교와 학과명을 기입해주세요
          </p>
        </div>

        <button onClick={onUnivOpen}>
          <Input
            variant='bordered'
            isRequired
            disabled
            label='대학명'
            value={univ}
            className='pointer-events-none'
            classNames={{
              inputWrapper: 'border border-solid border-slate-200',
            }}
          />
        </button>

        <button disabled={univ === ''} onClick={onDepartmentOpen}>
          <Input
            variant='bordered'
            disabled
            isRequired
            label='학과명'
            value={department}
            className='pointer-events-none'
            classNames={{
              inputWrapper: 'border border-solid border-slate-200',
            }}
          />
        </button>

        <button
          onClick={handleSubmit}
          disabled={univ !== '' && department !== '' ? false : true}
          className={`absolute bottom-[40px] left-0 ${univ !== '' && department !== '' ? 'full-btn' : 'btn'} w-full h-[50px] content-center`}
        >
          {isLoading ? '확인중...' : '다음'}
        </button>
      </div>

      <Modal
        isOpen={isUnivOpen}
        placement='bottom-center'
        onOpenChange={onUnivOpenChange}
        className='w-4/5'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>대학교</ModalHeader>
              <ModalBody>
                <Input
                  variant='bordered'
                  classNames={{
                    inputWrapper: 'border border-solid border-slate-200',
                  }}
                  value={searchUniv}
                  onValueChange={setSearchUniv}
                  startContent={
                    <Image
                      src='/register/univ/search.svg'
                      alt='search'
                      width={25}
                      height={25}
                    />
                  }
                />
                <div className='w-full h-[300px] overflow-y-scroll px-[20px] py-[10px] card-border rounded-medium'>
                  <div className='w-full flex flex-col gap-[10px]'>
                    {searchUniv.length !== 0
                      ? searchUnivResult.map((item) => (
                          <button
                            onClick={() => setUniv(item)}
                            className={`${univ === item ? 'focus-btn' : null} py-[5px] text-subtitle`}
                            key={item}
                          >
                            {item}
                          </button>
                        ))
                      : univList.map((item) => (
                          <button
                            onClick={() => setUniv(item)}
                            className={`${univ === item ? 'focus-btn' : null} py-[5px] text-subtitle`}
                            key={item}
                          >
                            {item}
                          </button>
                        ))}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  onClick={() => {
                    onClose();
                    setUniv('');
                    setSearchUniv('');
                  }}
                  className='btn px-[20px] py-[5px]'
                >
                  취소
                </button>
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

      <Modal
        isOpen={isDepartmentOpen}
        placement='bottom-center'
        onOpenChange={onDepartmentOpenChange}
        className='w-4/5'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>학과명</ModalHeader>
              <ModalBody>
                <Input
                  variant='bordered'
                  classNames={{
                    inputWrapper: 'border border-solid border-slate-200',
                  }}
                  value={searchDepartment}
                  onValueChange={setSearchDepartment}
                  startContent={
                    <Image
                      src='/register/univ/search.svg'
                      alt='search'
                      width={25}
                      height={25}
                    />
                  }
                />
                <div className='w-full h-[300px] overflow-y-scroll px-[20px] py-[10px] card-border rounded-medium'>
                  <div className='w-full flex flex-col gap-[10px]'>
                    {searchDepartmentResult &&
                      searchDepartmentResult.map((item) => (
                        <button
                          onClick={() => setDepartment(item)}
                          className={`${department === item ? 'focus-btn' : null} py-[5px] text-subtitle`}
                          key={item}
                        >
                          {item}
                        </button>
                      ))}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  onClick={() => {
                    onClose();
                    setDepartment('');
                    setSearchDepartment('');
                  }}
                  className='btn px-[20px] py-[5px]'
                >
                  취소
                </button>
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

export default RegisterUniv;
