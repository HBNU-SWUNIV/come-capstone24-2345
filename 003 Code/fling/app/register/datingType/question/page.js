'use client';

import { useState } from 'react';
import Q1 from './Q1';
import Q2 from './Q2';
import Q3 from './Q3';
import Q4 from './Q4';
import Q5 from './Q5';
import Q6 from './Q6';
import { easeInOut } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, x: 100, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

const RegisterDatingTypeQuestion = () => {
  let [answer, setAnswer] = useState([0, 0, 0, 0, 0, 0]);
  let [page, setPage] = useState(1);

  const questions = () => {
    switch (page) {
      case 1:
        return (
          <Q1
            variants={variants}
            easeInOut={easeInOut}
            answer={answer}
            setAnswer={setAnswer}
            setPage={setPage}
          />
        );
      case 2:
        return (
          <Q2
            variants={variants}
            easeInOut={easeInOut}
            answer={answer}
            setAnswer={setAnswer}
            setPage={setPage}
          />
        );
      case 3:
        return (
          <Q3
            variants={variants}
            easeInOut={easeInOut}
            answer={answer}
            setAnswer={setAnswer}
            setPage={setPage}
          />
        );
      case 4:
        return (
          <Q4
            variants={variants}
            easeInOut={easeInOut}
            answer={answer}
            setAnswer={setAnswer}
            setPage={setPage}
          />
        );
      case 5:
        return (
          <Q5
            variants={variants}
            easeInOut={easeInOut}
            answer={answer}
            setAnswer={setAnswer}
            setPage={setPage}
          />
        );
      case 6:
        return (
          <Q6
            variants={variants}
            easeInOut={easeInOut}
            answer={answer}
            setAnswer={setAnswer}
            setPage={setPage}
          />
        );
    }
  };
  return (
    <div className='w-full h-dvh px-[40px] pt-[80px] pb-[120px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='w-full text-start'>
          <span className='text-title text-main-red'>Q{page}</span>
        </div>
        {questions()}
      </div>
    </div>
  );
};

export default RegisterDatingTypeQuestion;
