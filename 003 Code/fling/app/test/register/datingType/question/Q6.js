import axios from 'axios';
import { useState } from 'react';
import ResultDatingType from './ResultDatingType';

const Q6 = (props) => {
  const [showResult, setShowResult] = useState(false);
  const [datingType, setDatingType] = useState(null);

  const handleQuestion = (ans) => {
    let copy = [...props.answer];
    copy[5] = ans;
    props.setAnswer(copy);
  };

  const handleShowResult = async () => {
    await axios
      .post('/api/check/datingType', { tendency: props.answer })
      .then((result) => {
        setShowResult(true);
        setDatingType(result.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handlePrevBtn = () => {
    props.setPage((prev) => prev - 1);
  };

  return (
    <div className='w-full flex flex-col'>
      {showResult && <ResultDatingType datingType={datingType} />}
      <div className='w-full mt-[120px] text-start'>
        <span className='text-title'>Q6</span>
      </div>

      <div className='w-full my-[20px]'>
        <img className='w-full h-[200px] bg-main-red' />
        <div className='text-start text-subtitle opacity-70 mt-[20px]'>
          <p>회원님이 연인과 의견이 다를 때</p>
          <p>회원님은 어떻게 하시나요?</p>
        </div>
      </div>

      <div className='w-full flex flex-col gap-[20px]'>
        <button
          onClick={() => handleQuestion(1)}
          className={`py-[15px] ${props.answer[5] == 1 ? 'focus-btn' : 'btn'}`}
        >
          연인의 의견을 존중하며 대화를 나눔
        </button>
        <button
          onClick={() => handleQuestion(2)}
          className={`py-[15px] ${props.answer[5] == 2 ? 'focus-btn' : 'btn'}`}
        >
          연인의 의견을 이해하고 노력하며 때로는 양보
        </button>
        <button
          onClick={() => handleQuestion(3)}
          className={`py-[15px] ${props.answer[5] == 3 ? 'focus-btn' : 'btn'}`}
        >
          감정적으로 반응하고 자신의 의견을 주장
        </button>
      </div>

      <div className='w-full flex gap-[10px]'>
        <button
          disabled={props.answer[4] === 0}
          onClick={handlePrevBtn}
          className={`w-full h-[60px] my-[30px] ${props.answer[4] !== 0 ? 'full-btn' : 'disabled-btn'}`}
        >
          이전질문
        </button>
        <button
          disabled={
            props.answer[5] === 0 &&
            !props.answer.some((answer) => answer === 0)
          }
          onClick={handleShowResult}
          className={`w-full h-[60px] my-[30px] ${props.answer[3] !== 0 && !props.answer.some((answer) => answer === 0) ? 'full-btn' : 'disabled-btn'}`}
        >
          결과보기
        </button>
      </div>
    </div>
  );
};

export default Q6;
