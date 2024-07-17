'use client';

import { useState } from 'react';
import Q1 from './Q1';
import Q2 from './Q2';
import Q3 from './Q3';
import Q4 from './Q4';
import Q5 from './Q5';
import Q6 from './Q6';
import ResultDatingType from './ResultDatingType';

const RegisterDatingTypeQuestion = () => {
  let [answer, setAnswer] = useState([0, 0, 0, 0, 0, 0]);
  let [page, setPage] = useState(1);

  const questions = () => {
    switch (page) {
      case 1:
        return <Q1 answer={answer} setAnswer={setAnswer} setPage={setPage} />;
      case 2:
        return <Q2 answer={answer} setAnswer={setAnswer} setPage={setPage} />;
      case 3:
        return <Q3 answer={answer} setAnswer={setAnswer} setPage={setPage} />;
      case 4:
        return <Q4 answer={answer} setAnswer={setAnswer} setPage={setPage} />;
      case 5:
        return <Q5 answer={answer} setAnswer={setAnswer} setPage={setPage} />;
      case 6:
        return <Q6 answer={answer} setAnswer={setAnswer} setPage={setPage} />;
    }
  };
  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>{questions()}</div>
    </div>
  );
};

export default RegisterDatingTypeQuestion;
