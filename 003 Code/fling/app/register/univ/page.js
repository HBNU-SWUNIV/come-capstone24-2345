'use client';

import {
  setGlobalDepartment,
  setGlobalEmail,
  setGlobalUniv,
} from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterUniv = () => {
  let [totalUnivDepartment, setTotalUnivDepartment] = useState({});
  let [totalUnivName, setTotalUnivName] = useState([]);
  let [isClickSearch, setIsClickSearch] = useState(false);
  let [searchPage, setSearchPage] = useState(true);
  let [univ, setUniv] = useState('');
  let [department, setDepartment] = useState('');
  let [email, setEmail] = useState('');
  let [certReq, setCertReq] = useState(false);
  let [certNum, setCertNum] = useState('');
  let [receivedCertNum, setReceivedCertNum] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCSVData = async () => {
      await axios('/23년_대학명_및_학과명_리스트.csv').then((result) => {
        let csvFile = result.data;
        let splitRow = csvFile.split('\r\n');
        splitRow.shift();
        splitRow = splitRow.map((element) => {
          return element.split(',');
        });

        const univ_department = {};

        let featuring = splitRow.map((element) => {
          let [univName, , , , department] = element;
          if (!univ_department[univName]) {
            univ_department[univName] = [];
          }
          univ_department[univName].push(department);

          return element[0];
        });

        setTotalUnivName(
          [...new Set(featuring)].sort((a, b) => a.localeCompare(b, 'ko-KR'))
        );
        setTotalUnivDepartment(univ_department);
      });
    };
    fetchCSVData();
  }, []);

  const clickSearch = (e) => {
    setIsClickSearch(true);
  };

  const handleUniv = (e) => {
    let univ = e.target.textContent;
    setUniv(univ);
    setSearchPage((state) => !state);
  };

  const handleDepartment = (e) => {
    let department = e.target.textContent;
    setDepartment(department);
    setIsClickSearch(false);
    setSearchPage((state) => !state);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleCertNum = (e) => {
    setCertNum(e.target.value);
  };

  const clickCertReq = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/check/univ', {
        univ,
        department,
        email,
      })
      .then((result) => {
        setCertReq(true);
        setReceivedCertNum(result.data.certNum);
        dispatch(setGlobalUniv(result.data.univ));
        dispatch(setGlobalDepartment(result.data.department));
        dispatch(setGlobalEmail(result.data.email));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  const checkCert = async (e) => {
    e.preventDefault();

    if (certNum == receivedCertNum) {
      alert('인증되었습니다!');
      router.push('/register/account');
    } else {
      alert('인증번호가 올바르지 않습니다');
    }
  };

  return (
    <>
      {isClickSearch && (
        <div className='w-full h-screen flex justify-center items-center bg-black/60 absolute top-0 left-0 z-50'>
          <div className='size-4/5 flex flex-col p-[20px] card rounded-[20px]'>
            {searchPage ? (
              <>
                <span style={{ fontSize: '20px' }}>대학교 리스트</span>
                <div className='flex flex-col w-full h-full mb-[20px] overflow-y-scroll'>
                  {totalUnivName?.map((univName) => {
                    return (
                      <p
                        key={univName}
                        className='bg-white rounded-full p-[8px] my-[4px] whitespace-nowrap cursor-pointer'
                        onClick={handleUniv}
                      >
                        {univName}
                      </p>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <span style={{ fontSize: '20px' }}>학과 리스트</span>
                <div className='flex flex-col w-full h-full mb-[20px] overflow-y-scroll'>
                  {totalUnivDepartment[univ].map((departmentName) => {
                    return (
                      <p
                        key={univ + departmentName}
                        className='w-full bg-white rounded-full py-[8px] my-[4px] whitespace-nowrap cursor-pointer'
                        onClick={handleDepartment}
                      >
                        {departmentName}
                      </p>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={51}
        min={0}
        max={100}
      ></progress>
      <div className='size-full flex flex-col'>
        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          회원님의 대학정보를 적어주세요
        </span>
        <form onSubmit={clickCertReq} method='POST'>
          <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
            <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
              대학교명
            </span>
            <div className='w-full flex justify-between cursor-pointer'>
              <input
                onChange={handleUniv}
                value={univ}
                disabled
                placeholder='국립한밭대학교'
                className='bg-transparent flex-grow'
              />
              <img onClick={clickSearch} src='/search.svg' />
            </div>
          </div>

          <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px] relative'>
            <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
              학과명
            </span>
            <div className='w-full flex justify-between cursor-pointer'>
              <input
                onChange={handleDepartment}
                value={department}
                disabled
                autoComplete='off'
                placeholder='컴퓨터공학과'
                className='bg-transparent'
              />
            </div>
          </div>

          <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
            <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
              학교 이메일
            </span>
            <input
              onChange={handleEmail}
              inputMode='email'
              autoComplete='off'
              placeholder='example@school.ac.kr'
              className='bg-transparent'
            />
          </div>

          <button
            className='w-full btn p-[20px] mb-[20px] rounded-full'
            type='submit'
          >
            인증 요청
          </button>
        </form>

        {certReq && (
          <>
            <div
              className='flex flex-col mb-[20px]'
              style={{ fontSize: '12px', opacity: '0.7' }}
            >
              <span>인증번호를 받지 못하셨나요? </span>
              <span>상단의 인증 요청버튼을 누르면 다시 받을 수 있어요</span>
            </div>
            <form onSubmit={checkCert} method='POST'>
              <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
                <span
                  className='text-start mb-[16px]'
                  style={{ fontSize: '14px' }}
                >
                  인증번호
                </span>
                <input
                  onChange={handleCertNum}
                  value={certNum}
                  placeholder='12345678'
                  className='bg-transparent'
                />
              </div>

              <button className='w-full btn p-[20px] mb-[20px] rounded-full'>
                확인
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default RegisterUniv;
