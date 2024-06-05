const ThirdQuestion = (props) => {
  let question = [
    '로맨틱한 식사나 영화 관람',
    '서로의 취미를 공유하고 함께 즐김',
    '각자의 시간을 존중하며 따로 시간을 보냄',
  ];

  const handleClickQuestion = (index) => {
    props.handleChecked(2, index);
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
        <span>Q3.</span>
        <span>연인과 함께있을 때, 어떤 활동을 선호하나요?</span>
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

export default ThirdQuestion;
