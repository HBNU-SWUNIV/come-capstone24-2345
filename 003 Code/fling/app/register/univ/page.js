'use client';

import {
  setGlobalDepartment,
  setGlobalEmail,
  setGlobalUniv,
} from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const RegisterUniv = () => {
  let [certReq, setCertReq] = useState(false);
  let [univ, setUniv] = useState('');
  let [department, setDepartment] = useState('');
  let [email, setEmail] = useState('');
  let [certNum, setCertNum] = useState('');
  let [receivedCertNum, setReceivedCertNum] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const globalUserInfo = useSelector((state) => state.registerUserInfo);

  const handleUniv = (e) => {
    setUniv(e.target.value);
  };
  const handleDepartment = (e) => {
    setDepartment(e.target.value);
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
        console.log('/register/univ : ' + JSON.stringify(globalUserInfo));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  const checkCert = async (e) => {
    e.preventDefault();

    if (certNum == receivedCertNum) {
      alert('인증되었습니다!');
      console.log('/register/univ : ' + JSON.stringify(globalUserInfo));
      router.push('/register/account');
    } else {
      alert('인증번호가 올바르지 않습니다');
    }
  };

  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={40}
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
            <input
              onChange={handleUniv}
              inputMode='text'
              autoComplete='off'
              placeholder='국립한밭대학교'
              autoFocus={true}
              className='bg-transparent'
            />
          </div>

          <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
            <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
              학과명
            </span>
            <input
              onChange={handleDepartment}
              inputMode='text'
              autoComplete='off'
              placeholder='컴퓨터공학과'
              className='bg-transparent'
            />
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

          <button className='w-full btn p-[20px] mb-[20px]' type='submit'>
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
