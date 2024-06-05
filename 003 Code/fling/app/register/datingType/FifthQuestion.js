const FifthQuestion = (props) => {
  let question = [
    '서로의 관심사를 고려해 철저히 계획',
    '즉흥적으로 떠나 모험을 즐김',
    '연인이 원하는 대로 계획을 맡김',
  ];

  const handleClickQuestion = (index) => {
    props.handleChecked(4, index);
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
        <span>Q5.</span>
        <span>연인과의 여행 계획을 세울 때, 접근 방식은?</span>
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

export default FifthQuestion;
