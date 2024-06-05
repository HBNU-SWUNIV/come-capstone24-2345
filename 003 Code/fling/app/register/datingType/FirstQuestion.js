const FirstQuestion = (props) => {
  let question = [
    '감동적인 서프라이즈 이벤트를 계획',
    '친구들과 함께 파티를 준비',
    '연인이 원하는 것을 직접 물어보고 준비',
  ];

  const handleClickQuestion = (index) => {
    props.handleChecked(0, index);
  };

  const clickNext = () => {
    props.handleChangePage(true);
  };

  return (
    <>
      <div className='w-full h-[300px] flex flex-col items-center justify-evenly card rounded-[20px] p-[20px] mb-[20px]'>
        <img className='w-4/5 h-[200px] mb-[20px]' src='' />
        <span>Q1.</span>
        <span>당신의 연인의 생일 때, 어떻게 준비를 하나요?</span>
      </div>

      {question.map((element, index) => {
        return (
          <button
            key={element}
            onClick={() => handleClickQuestion(index)}
            className={`w-full p-[20px] ${props.checkedAnswer == index ? 'btn' : 'card'} rounded-full mb-[20px]`}
          >
            {element}
          </button>
        );
      })}

      {/* <button
        onClick={clickPrev}
        className='w-full p-[20px] btn rounded-full my-[20px]'
      >
        이전질문
      </button> */}

      <button
        onClick={clickNext}
        className='w-full p-[20px] btn rounded-full my-[20px]'
      >
        다음질문
      </button>
    </>
  );
};

export default FirstQuestion;
