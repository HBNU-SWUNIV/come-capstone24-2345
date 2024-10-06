'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Input } from '@nextui-org/react';
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import { Divider } from '@nextui-org/divider';
import { setStoreNickname, setStorePassword } from '../../../library/store';

const RegisterAccount = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);
  const [isInvalidNickname, setIsInvalidNickname] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidRePassword, setIsInvalidRePassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.registerUserInfo.email);
  const userNickname = useSelector((state) => state.registerUserInfo.nickname);
  const userPassword = useSelector((state) => state.registerUserInfo.password);

  const router = useRouter();

  useEffect(() => {
    const passwordPattern = new RegExp(
      '^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$'
    );

    passwordPattern.test(password)
      ? setIsInvalidPassword(false)
      : setIsInvalidPassword(true);
  }, [password]);

  useEffect(() => {
    const nicknameRegex = /[a-zA-Z가-힣]+/; // 한글이나 영어가 최소 한글자
    const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ]/g; // 자음이나 모음이 단독으로
    const spaceRegex = /\s/; // 공백체크

    nicknameRegex.test(nickname) &&
    (nickname.match(koreanRegex) === null ||
      nickname.match(koreanRegex).length === 0) &&
    !spaceRegex.test(nickname)
      ? setIsInvalidNickname(false)
      : setIsInvalidNickname(true);

    //한글
    if (nickname.length > 8) {
      setIsInvalidNickname(true);
    }
  }, [nickname]);

  useEffect(() => {
    rePassword && password === rePassword
      ? setIsInvalidRePassword(false)
      : setIsInvalidRePassword(true);
  }, [rePassword]);

  useEffect(() => {
    if (userEmail && userNickname && userPassword) {
      router.replace('/register/mbti');
    }
  }, [userEmail, userNickname, userPassword]);

  const handleNickname = async (e) => {
    e.preventDefault();
    if (nickname === '') {
      alert('닉네임을 입력해주세요');
    } else {
      try {
        const result = await axios.post('/api/register/nickname', { nickname });
        if (result.status === 200) {
          setIsInvalidNickname(false);
          setIsCheckedNickname(true);
        }
      } catch (err) {
        setIsInvalidNickname(true);
        setIsCheckedNickname(false);
        alert(err.response.data);
      }
    }
  };

  const handleAccount = async (e) => {
    e.preventDefault();
    if (
      nickname &&
      password &&
      rePassword &&
      !isInvalidNickname &&
      !isInvalidPassword &&
      !isInvalidRePassword &&
      isCheckedNickname
    ) {
      try {
        const result = await axios.post('/api/register/password', { password });
        const hashedPW = result.data;
        setIsLoading(true);
        dispatch(setStorePassword(hashedPW));
        dispatch(setStoreNickname(nickname));
      } catch (err) {
        alert(err.response.data);
      }
    } else if (!userEmail) {
      alert('잘못된 접근입니다');
      router.replace('/');
    } else {
      alert('모두 조건에 맞게 입력해주세요');
    }
  };

  return (
    <div className='w-full h-dvh px-[40px] pt-[80px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='text-start w-3/5  flex flex-col gap-[10px]'>
          <p className='text-title text-main-red'>계정 생성</p>
        </div>
        <form onSubmit={handleNickname} className='w-full flex gap-[10px]'>
          <Input
            variant='bordered'
            label='닉네임 (최소4자 최대8자)'
            minLength={4}
            maxLength={8}
            isRequired
            isInvalid={!nickname ? false : isInvalidNickname}
            errorMessage='사용할 수 없는 닉네임입니다'
            description={
              isCheckedNickname
                ? '사용가능한 닉네임입니다'
                : `한글이나 영어를 최소 한글자 이상, 특수기호O, 공백X`
            }
            value={nickname}
            color={
              !nickname
                ? ''
                : isCheckedNickname && !isInvalidNickname
                  ? 'success'
                  : ''
            }
            onValueChange={(value) => {
              setNickname(value);
              setIsCheckedNickname(false);
            }}
            className='flex-1'
            classNames={{
              inputWrapper: `border border-solid ${isCheckedNickname && !isInvalidNickname ? 'border-success' : 'border-slate-200'}`,
              errorMessage: 'text-start',
              description: `text-start ${isCheckedNickname && !isInvalidNickname && 'text-success'}`,
            }}
          />
          <button
            type='submit'
            disabled={!isInvalidNickname && nickname.length > 3 ? false : true}
            className={`${!isInvalidNickname && nickname.length > 3 ? 'full-btn' : 'btn'} text-subtitle h-[56px] w-1/5`}
          >
            중복확인
          </button>
        </form>

        {isCheckedNickname && (
          <>
            <Divider className='my-[5px]' />

            <form
              id='input-account'
              onSubmit={handleAccount}
              className='w-full flex flex-col gap-[20px]'
            >
              <Input
                variant='bordered'
                label='이메일'
                isRequired
                value={userEmail}
                disabled
                description='아이디는 학교 이메일을 사용'
                className='pointer-events-none'
                classNames={{
                  inputWrapper: 'border border-solid border-slate-200',
                  description: 'text-start',
                }}
              />

              <Input
                variant='bordered'
                label='비밀번호'
                isRequired
                value={password}
                isInvalid={password === '' ? false : isInvalidPassword}
                errorMessage='사용할 수 없는 비밀번호입니다'
                onValueChange={setPassword}
                color={
                  !password ? '' : !isInvalidPassword ? 'success' : 'danger'
                }
                endContent={
                  <button
                    className='focus:outline-none'
                    type='button'
                    onClick={() => setIsVisible((prev) => !prev)}
                    aria-label='toggle password visibility'
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className='text-xl text-default-400 pointer-events-none' />
                    ) : (
                      <EyeFilledIcon className='text-xl text-default-400 pointer-events-none' />
                    )}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                description='숫자, 특수기호를 최소 하나 이상 조합 및 8자 이상'
                classNames={{
                  label: `${!password && 'text-default-600'}`,
                  inputWrapper: `border border-solid ${!isInvalidPassword && 'border-success'}`,
                  description: 'text-start',
                  errorMessage: 'text-start',
                }}
              />

              <Input
                variant='bordered'
                label='비밀번호 재입력'
                isRequired
                value={rePassword}
                isInvalid={rePassword === '' ? false : isInvalidRePassword}
                errorMessage='비밀번호가 일치하지 않습니다'
                onValueChange={setRePassword}
                color={
                  !rePassword ? '' : !isInvalidRePassword ? 'success' : 'danger'
                }
                type='password'
                classNames={{
                  label: `${!rePassword && 'text-default-600'}`,
                  inputWrapper: `border border-solid ${!isInvalidRePassword && 'border-success'}`,
                  description: 'text-start',
                  errorMessage: 'text-start',
                }}
              />
            </form>
          </>
        )}

        <label htmlFor='input-account' onClick={handleAccount}>
          <button
            type='submit'
            disabled={nickname && password && rePassword ? false : true}
            className={`absolute bottom-[40px] left-0 ${nickname && password && rePassword && password === rePassword ? 'full-btn' : 'btn'} w-full h-[50px] content-center cursor-pointer`}
          >
            {isLoading ? '확인중...' : '다음'}
          </button>
        </label>
      </div>
    </div>
  );
};

export default RegisterAccount;
