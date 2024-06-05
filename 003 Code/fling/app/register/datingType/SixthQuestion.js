const SixthQuestion = (props) => {
  let question = [
    '상대방의 의견을 존중하며 대화를 나눔',
    '상대방의 의견을 이해하고 노력하며 때로는 양보',
    '감정적으로 반응하고 자신의 의견을 강하게 주장',
  ];

  const handleClickQuestion = (index) => {
    props.handleChecked(5, index);
  };

  const clickPrev = () => {
    props.handleChangePage(false);
  };

  const handleSubmit = () => {
    props.isSubmit(true);
  };

  return (
    <>
      <div className='w-full h-[300px] flex flex-col items-center justify-evenly card rounded-[20px] p-[20px] mb-[20px]'>
        <img className='w-4/5 h-[200px] mb-[20px]' src='' />
        <span>Q6.</span>
        <span>연인과 의견이 다를 때, 어떻게 하나요?</span>
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

        {/* <button
          onClick={clickNext}
          className='w-full p-[20px] btn rounded-full my-[20px]'
        >
          다음질문
        </button> */}
      </div>

      <button
        onClick={handleSubmit}
        className='w-full p-[20px] btn rounded-full my-[20px]'
      >
        결과보기
      </button>
    </>
  );
};

export default SixthQuestion;
