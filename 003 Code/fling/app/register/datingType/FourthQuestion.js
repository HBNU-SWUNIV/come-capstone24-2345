const FourthQuestion = (props) => {
  let question = [
    '따뜻한 위로와 관심을 보여줌',
    '기분 전환을 위해 새로운 활동을 제안',
    '연인의 공간을 존중하며 혼자 있을 시간을 줌',
  ];

  const handleClickQuestion = (index) => {
    props.handleChecked(3, index);
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
        <span>Q4.</span>
        <span>연인이 기분이 좋지 않을 때, 어떻게 하나요?</span>
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

export default FourthQuestion;
