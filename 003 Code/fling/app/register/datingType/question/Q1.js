const Q1 = (props) => {
  const handleQuestion = (ans) => {
    let copy = [...props.answer];
    copy[0] = ans;
    props.setAnswer(copy);
  };

  const handleNextBtn = () => {
    props.setPage((prev) => prev + 1);
  };

  return (
    <div className='w-full flex-1 flex gap-[20px] flex-col items-center overflow-y-scroll'>
      <div className='w-full'>
        <img className='w-full h-[200px] bg-main-red' />
        <div className='text-start text-subtitle opacity-70 mt-[20px] text-gray-500'>
          <p>회원님의 연인의 생일이 다가왔어요</p>
          <p>회원님은 어떻게 준비하나요?</p>
        </div>
      </div>

      <div className='w-full flex flex-col gap-[20px]'>
        <button
          onClick={() => handleQuestion(1)}
          className={`text-subtitle w-full h-[50px] ${props.answer[0] == 1 ? 'focus-btn' : 'btn'}`}
        >
          감동적인 서프라이즈 이벤트를 계획
        </button>
        <button
          onClick={() => handleQuestion(2)}
          className={`text-subtitle w-full h-[50px] ${props.answer[0] == 2 ? 'focus-btn' : 'btn'}`}
        >
          친구들과 함께 파티를 준비
        </button>
        <button
          onClick={() => handleQuestion(3)}
          className={`text-subtitle w-full h-[50px] ${props.answer[0] == 3 ? 'focus-btn' : 'btn'}`}
        >
          연인이 원하는 것을 직접 물어보고 준비
        </button>
      </div>

      <button
        disabled={props.answer[0] === 0}
        onClick={handleNextBtn}
        className={`absolute bottom-[-80px] w-full left-0 h-[50px] content-center ${props.answer[0] !== 0 ? 'full-btn' : 'btn'}`}
      >
        다음질문
      </button>
    </div>
  );
};

export default Q1;
