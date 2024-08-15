'use client';

import { setGlobalEmail } from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterEmail = () => {
  const [email, setEmail] = useState('');
  const [page, setPage] = useState(0);
  const [verificationCode, setVerificationCode] = useState(0);
  const [timer, setTimer] = useState(180);
  const [codeSent, setCodeSent] = useState(false);
  const [clickReSend, setClickReSend] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [code, setCode] = useState(['', '', '', '']);

  const router = useRouter();
  const codeNumRef = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let timerInterval;
    setTimer(180);
    setButtonDisabled(false);
    if (codeSent) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval);
            setButtonDisabled(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [codeSent, clickReSend]);

  useEffect(() => {
    if (codeNumRef.current[0]) {
      codeNumRef.current[0].focus();
      return;
    }
  }, [codeNumRef]);

  const handleInput = (e, index) => {
    if (e.target.value.length === 1 && index < codeNumRef.current.length - 1) {
      codeNumRef.current[index + 1].focus();
    }

    if (e.target.value.length === 0 && index > 0) {
      codeNumRef.current[index - 1].focus();
    }

    let copy = [...code];
    if (isNaN(e.target.value)) {
      copy[index] = '';
    } else if (e.target.value.length > 1) {
      copy[index] = e.target.value[0];
    } else {
      copy[index] = e.target.value;
    }

    setCode(copy);
  };

  const handleFirstPageNext = async () => {
    await axios
      .post('/api/check/email', { email })
      .then((result) => {
        setPage(1);
        setCodeSent(true);

        setEmail(result.data.email);
        setVerificationCode(result.data.verificationCode);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleResendCode = async () => {
    setClickReSend((prev) => !prev);
    await axios
      .get('/api/email/verificationCode')
      .then((result) => {
        setVerificationCode(result.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSecondPageNext = () => {
    let inputCode = parseInt(code[0] + code[1] + code[2] + code[3]);

    if (inputCode === verificationCode) {
      dispatch(setGlobalEmail(email));
      alert('인증되었습니다!');
      router.replace('/register/photo');
    } else {
      alert('인증코드가 일치하지 않습니다!');
    }
  };

  if (page === 0) {
    return (
      <div className='w-full h-screen px-[40px] relative'>
        <div className='size-full flex flex-col items-center'>
          <div className='w-full mt-[120px] text-start'>
            <p className='text-title'>인증번호 전송</p>
            <div className='my-[10px] opacity-70'>
              <p className='text-subtitle'>학교 이메일 계정을 입력해주세요</p>
              <p className='text-subtitle'>저희가 4자리 인증번호를</p>
              <p className='text-subtitle'>
                회원님의 이메일 계정으로 보내드릴게요
              </p>
            </div>
          </div>

          <div className='w-full mt-[20px] flex flex-col gap-[20px]'>
            <div className='relative w-full'>
              <input
                type='email'
                placeholder=' '
                className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
                학교 이메일
              </label>
            </div>
          </div>

          <div className='absolute bottom-[50px] w-[calc(100%_-_80px)]'>
            <button
              disabled={email === ''}
              onClick={handleFirstPageNext}
              className={`w-full h-[60px] my-[20px] ${email === '' ? 'disabled-btn' : 'full-btn'}`}
            >
              인증번호 받기
            </button>
          </div>
        </div>
      </div>
    );
  } else if (page === 1) {
    return (
      <div className='w-full h-screen px-[40px] relative'>
        <div className='size-full flex flex-col items-center'>
          <div className='w-full mt-[120px] text-center'>
            <span className='text-title text-main-red'>
              {timer === 0 ? '인증시간이 만료되었습니다' : formatTime(timer)}
            </span>
            <div className='text-subtitle my-[10px] opacity-70'>
              <p>이메일로 전송한 4자리 인증번호를 입력해주세요</p>
            </div>
          </div>

          <form className='w-full flex gap-[10px] mt-[20px]'>
            {code.map((_, index) => {
              return (
                <input
                  ref={(el) => {
                    codeNumRef.current[index] = el;
                  }}
                  key={`emailCode${index}`}
                  onChange={(e) => {
                    handleInput(e, index);
                  }}
                  value={code[index]}
                  placeholder='0'
                  inputMode='numeric'
                  className={`text-title w-1/4 aspect-square ${code[index] == '' ? 'btn' : `focus-btn`} text-center caret-transparent focus:border-main-red focus:border-2`}
                />
              );
            })}
          </form>
          <button
            disabled={timer !== 0}
            className={`text-main-red mt-[20px] ${timer !== 0 ? 'disabled-btn' : 'focus-btn'} px-[10px] py-[5px]`}
            onClick={handleResendCode}
          >
            인증번호 재전송
          </button>

          <div className='absolute bottom-[50px] w-[calc(100%_-_80px)]'>
            <button
              disabled={buttonDisabled}
              onClick={handleSecondPageNext}
              className={`w-full h-[60px] my-[20px] ${buttonDisabled ? 'disabled-btn' : 'full-btn'}`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default RegisterEmail;
