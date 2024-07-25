'use client';

import { useState } from 'react';
import FirstQuestion from './FirstQuestion';
import SecondQuestion from './SecondQuestion';
import ThirdQuestion from './ThirdQuestion';
import FourthQuestion from './FourthQuestion';
import FifthQuestion from './FifthQuestion';
import SixthQuestion from './SixthQuestion';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setGlobalDatingType } from '@/library/store';
import { useRouter } from 'next/navigation';

const RegisterTendency = () => {
  let [questionPage, setQuestionPage] = useState(0);
  let [tendency, setTendency] = useState([null, null, null, null, null, null]);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChecked = (questionPage, checkedAnswer) => {
    let copy = [...tendency];
    copy[questionPage] = checkedAnswer;
    setTendency(copy);
  };

  const handleChangePage = (changedPage) => {
    changedPage
      ? setQuestionPage((state) => state + 1)
      : setQuestionPage((state) => state - 1);
  };

  const isSubmit = async (boolean) => {
    if (boolean) {
      await axios
        .post('/api/check/datingType', { tendency })
        .then((result) => {
          dispatch(setGlobalDatingType(result.data));
          router.push('/register/etc');
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  };

  const returnQuestion = () => {
    switch (questionPage) {
      case 0:
        return (
          <FirstQuestion
            handleChecked={handleChecked}
            handleChangePage={handleChangePage}
            checkedAnswer={tendency[0]}
          />
        );
      case 1:
        return (
          <SecondQuestion
            handleChecked={handleChecked}
            handleChangePage={handleChangePage}
            checkedAnswer={tendency[1]}
          />
        );
      case 2:
        return (
          <ThirdQuestion
            handleChecked={handleChecked}
            handleChangePage={handleChangePage}
            checkedAnswer={tendency[2]}
          />
        );
      case 3:
        return (
          <FourthQuestion
            handleChecked={handleChecked}
            handleChangePage={handleChangePage}
            checkedAnswer={tendency[3]}
          />
        );
      case 4:
        return (
          <FifthQuestion
            handleChecked={handleChecked}
            handleChangePage={handleChangePage}
            checkedAnswer={tendency[4]}
          />
        );
      case 5:
        return (
          <SixthQuestion
            handleChecked={handleChecked}
            handleChangePage={handleChangePage}
            checkedAnswer={tendency[5]}
            isSubmit={isSubmit}
          />
        );
      default:
        return (
          <FirstQuestion
            handleChecked={handleChecked}
            handleChangePage={handleChangePage}
            checkedAnswer={tendency[0]}
          />
        );
    }
  };
  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={70}
        min={0}
        max={100}
      ></progress>

      <span
        className='w-full text-start mb-[20px]'
        style={{ fontSize: '20px' }}
      >
        회원님의 연애유형 테스트
      </span>

      {returnQuestion()}
    </>
  );
};

export default RegisterTendency;
