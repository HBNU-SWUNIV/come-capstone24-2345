const Q4 = (props) => {
  const handleQuestion = (ans) => {
    let copy = [...props.answer];
    copy[3] = ans;
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
        <span className='text-title'>Q4</span>
      </div>

      <div className='w-full my-[20px]'>
        <img className='w-full h-[200px] bg-main-red' />
        <div className='text-start text-subtitle opacity-70 mt-[20px]'>
          <p>회원님의 연인께서 기분이 좋지 않을 때</p>
          <p>회원님은 어떻게 해결하시나요?</p>
        </div>
      </div>

      <div className='w-full flex flex-col gap-[20px]'>
        <button
          onClick={() => handleQuestion(1)}
          className={`py-[15px] ${props.answer[3] == 1 ? 'focus-btn' : 'btn'}`}
        >
          따뜻한 위로와 관심을 보여줌
        </button>
        <button
          onClick={() => handleQuestion(2)}
          className={`py-[15px] ${props.answer[3] == 2 ? 'focus-btn' : 'btn'}`}
        >
          기분 전환을 위해 새로운 활동을 제안
        </button>
        <button
          onClick={() => handleQuestion(3)}
          className={`py-[15px] ${props.answer[3] == 3 ? 'focus-btn' : 'btn'}`}
        >
          연인의 공간을 존중하며 혼자있을 시간을 줌
        </button>
      </div>

      <div className='w-full flex gap-[10px]'>
        <button
          disabled={props.answer[2] === 0}
          onClick={handlePrevBtn}
          className={`w-full h-[60px] my-[30px] ${props.answer[2] !== 0 ? 'full-btn' : 'disabled-btn'}`}
        >
          이전질문
        </button>
        <button
          disabled={props.answer[3] === 0}
          onClick={handleNextBtn}
          className={`w-full h-[60px] my-[30px] ${props.answer[3] !== 0 ? 'full-btn' : 'disabled-btn'}`}
        >
          다음질문
        </button>
      </div>
    </>
  );
};

export default Q4;
