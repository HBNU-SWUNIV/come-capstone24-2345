const SecondQuestion = (props) => {
  let question = [
    '깊은 대화를 통해 감정을 표현하고 해결',
    '논리적으로 문제를 분석하고 해결책을 제시',
    '시간이 해결해 줄 것이라 믿고 기다림',
  ];

  const handleClickQuestion = (index) => {
    props.handleChecked(1, index);
  };

  const clickNext = () => {
    props.handleChangePage(true);
  };

  const clickPrev = () => {
    props.handleChangePage(false);
  };

  return (
    <>
      <div className='w-full h-[300px] flex flex-col items-center justify-evenly card rounded-[20px] p-[20px] mb-[20px]'>
        <img className='w-4/5 h-[200px] mb-[20px]' src='' />
        <span>Q2.</span>
        <span>연인과 갈등이 생겼을 때, 어떻게 해결하나요?</span>
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

      <div className='w-full flex gap-[20px]'>
        <button
          onClick={clickPrev}
          className='w-full p-[20px] btn rounded-full my-[20px]'
        >
          이전질문
        </button>

        <button
          onClick={clickNext}
          className='w-full p-[20px] btn rounded-full my-[20px]'
        >
          다음질문
        </button>
      </div>
    </>
  );
};

export default SecondQuestion;
