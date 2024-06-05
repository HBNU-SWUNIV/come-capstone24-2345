'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Calendar from '../register/user/Calendar';

const FindPW = () => {
  let [totalUnivDepartment, setTotalUnivDepartment] = useState({});
  let [totalUnivName, setTotalUnivName] = useState([]);
  let [isClickSearch, setIsClickSearch] = useState(false);
  let [isClickReq, setIsClickReq] = useState(false);
  let [searchPage, setSearchPage] = useState(true);
  let [univ, setUniv] = useState('');
  let [department, setDepartment] = useState('');
  let [email, setEmail] = useState('');

  let [userName, setUserName] = useState('');
  let [userBirth, setUserBirth] = useState(new Date());
  let [password, setPassword] = useState('');
  let [reEnterPassword, setReEnterPassword] = useState('');
  let [findUserData, setFindUserData] = useState(null);

  const router = useRouter();
  const topRef = useRef();

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

  const clickCertReq = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/find/user', {
        userName,
        userBirth,
        univ,
        department,
        email,
      })
      .then((result) => {
        setIsClickReq(true);
        setFindUserData(result.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleUserBirth = (date) => {
    setUserBirth(date);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleReEnterPassword = (e) => {
    setReEnterPassword(e.target.value);
  };
  const handleChangePW = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/find/password', { findUserData, password, reEnterPassword })
      .then((result) => {
        alert(result.data);
        router.replace('/');
      })
      .catch((err) => {
        alert(err.response.data);
      });
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

      <div className='size-full flex flex-col'>
        {isClickReq ? (
          <>
            <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
              비밀번호를 변경해주세요
            </span>
            <form onSubmit={handleChangePW} method='POST'>
              <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
                <span
                  className='text-start mb-[16px]'
                  style={{ fontSize: '14px' }}
                >
                  비밀번호
                </span>
                <input
                  onChange={handlePassword}
                  autoComplete='off'
                  autoFocus={true}
                  value={password}
                  type='password'
                  placeholder='********'
                  className='bg-transparent'
                />
              </div>

              <div
                className='flex flex-col pl-[20px] mb-[20px] text-start'
                style={{ fontSize: '12px' }}
              >
                <span className=' mb-[8px]'>
                  숫자, 특수기호를 최소 하나 이상 조합
                </span>
                <span>비밀번호는 최소 8자 이상</span>
              </div>

              <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px] relative'>
                <span
                  className='text-start mb-[16px]'
                  style={{ fontSize: '14px' }}
                >
                  비밀번호 재입력
                </span>
                <div className='w-full flex justify-between cursor-pointer'>
                  <input
                    onChange={handleReEnterPassword}
                    value={reEnterPassword}
                    type='password'
                    placeholder='********'
                    autoComplete='off'
                    className='bg-transparent'
                  />
                </div>
              </div>

              <button
                className='w-full btn p-[20px] mb-[20px] rounded-full'
                type='submit'
              >
                변경하기
              </button>
            </form>
          </>
        ) : (
          <>
            <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
              가입했을 때 회원님의 정보를 입력해주세요
            </span>
            <form onSubmit={clickCertReq} method='POST'>
              <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
                <span
                  className='text-start mb-[16px]'
                  style={{ fontSize: '14px' }}
                >
                  이름
                </span>
                <input
                  onChange={handleUserName}
                  autoComplete='off'
                  autoFocus={true}
                  value={userName}
                  placeholder='홍길동'
                  className='bg-transparent'
                />
              </div>

              <div className='flex flex-col items-start p-[20px] card rounded-[20px] mb-[20px]'>
                <span
                  className='text-start mb-[16px]'
                  style={{ fontSize: '14px' }}
                >
                  생년월일
                </span>
                <Calendar
                  userBirth={userBirth}
                  handleUserBirth={handleUserBirth}
                />
              </div>
              <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
                <span
                  className='text-start mb-[16px]'
                  style={{ fontSize: '14px' }}
                >
                  대학교명
                </span>
                <div className='w-full flex justify-between cursor-pointer'>
                  <input
                    onChange={handleUniv}
                    value={univ}
                    disabled
                    className='bg-transparent flex-grow'
                  />
                  <img onClick={clickSearch} src='/search.svg' />
                </div>
              </div>

              <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px] relative'>
                <span
                  className='text-start mb-[16px]'
                  style={{ fontSize: '14px' }}
                >
                  학과명
                </span>
                <div className='w-full flex justify-between cursor-pointer'>
                  <input
                    onChange={handleDepartment}
                    value={department}
                    disabled
                    autoComplete='off'
                    className='bg-transparent'
                  />
                </div>
              </div>

              <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
                <span
                  className='text-start mb-[16px]'
                  style={{ fontSize: '14px' }}
                >
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
          </>
        )}
      </div>
    </>
  );
};

export default FindPW;
