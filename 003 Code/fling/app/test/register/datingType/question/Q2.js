const Q2 = (props) => {
  const handleQuestion = (ans) => {
    let copy = [...props.answer];
    copy[1] = ans;
    props.setAnswer(copy);
  };

  const handleNextBtn = () => {
    props.setPage((prev) => prev + 1);
  };

  const handlePrevBtn = () => {
    props.setPage((prev) => prev - 1);
  };

  return (
    <>
      <div className='w-full mt-[120px] text-start'>
        <span className='text-title'>Q2</span>
      </div>

      <div className='w-full my-[20px]'>
        <img className='w-full h-[200px] bg-main-red' />
        <div className='text-start text-subtitle opacity-70 mt-[20px]'>
          <p>회원님의 연인과 갈등이 생겼을 때</p>
          <p>회원님은 어떻게 해결하시나요?</p>
        </div>
      </div>

      <div className='w-full flex flex-col gap-[20px]'>
        <button
          onClick={() => handleQuestion(1)}
          className={`py-[15px] ${props.answer[1] == 1 ? 'focus-btn' : 'btn'}`}
        >
          깊은 대화를 통해 감정을 표현하고 해결
        </button>
        <button
          onClick={() => handleQuestion(2)}
          className={`py-[15px] ${props.answer[1] == 2 ? 'focus-btn' : 'btn'}`}
        >
          논리적으로 문제를 분석하고 해결책을 제시
        </button>
        <button
          onClick={() => handleQuestion(3)}
          className={`py-[15px] ${props.answer[1] == 3 ? 'focus-btn' : 'btn'}`}
        >
          시간이 해결해 줄 것이라 믿고 기다림
        </button>
      </div>

      <div className='w-full flex gap-[10px]'>
        <button
          disabled={props.answer[0] === 0}
          onClick={handlePrevBtn}
          className={`w-full h-[60px] my-[30px] ${props.answer[0] !== 0 ? 'full-btn' : 'disabled-btn'}`}
        >
          이전질문
        </button>
        <button
          disabled={props.answer[1] === 0}
          onClick={handleNextBtn}
          className={`w-full h-[60px] my-[30px] ${props.answer[1] !== 0 ? 'full-btn' : 'disabled-btn'}`}
        >
          다음질문
        </button>
      </div>
    </>
  );
};

export default Q2;
