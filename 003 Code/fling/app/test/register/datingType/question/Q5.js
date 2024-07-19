import { motion } from 'framer-motion';

const Q5 = (props) => {
  const handleQuestion = (ans) => {
    let copy = [...props.answer];
    copy[4] = ans;
    props.setAnswer(copy);
  };

  const handleNextBtn = () => {
    props.setPage((prev) => prev + 1);
  };

  const handlePrevBtn = () => {
    props.setPage((prev) => prev - 1);
  };

  return (
    <motion.div
      variants={props.variants}
      initial='hidden'
      animate='enter'
      transition={props.easeInOut}
      className='w-full'
    >
      <div className='w-full mt-[120px] text-start'>
        <span className='text-title'>Q5</span>
      </div>

      <div className='w-full my-[20px]'>
        <img className='w-full h-[200px] bg-main-red' />
        <div className='text-start text-subtitle opacity-70 mt-[20px]'>
          <p>회원님이 연인과 여행을 가기로 했어요</p>
          <p>여행계획을 어떤 방식으로 세우시나요?</p>
        </div>
      </div>

      <div className='w-full flex flex-col gap-[20px]'>
        <button
          onClick={() => handleQuestion(1)}
          className={`py-[15px] ${props.answer[4] == 1 ? 'focus-btn' : 'btn'}`}
        >
          서로의 관심사를 고려해 철저히 계획
        </button>
        <button
          onClick={() => handleQuestion(2)}
          className={`py-[15px] ${props.answer[4] == 2 ? 'focus-btn' : 'btn'}`}
        >
          즉흥적으로 떠나 모험을 즐김
        </button>
        <button
          onClick={() => handleQuestion(3)}
          className={`py-[15px] ${props.answer[4] == 3 ? 'focus-btn' : 'btn'}`}
        >
          연인이 원하는대로 계획을 맡김
        </button>
      </div>

      <div className='w-full flex gap-[10px]'>
        <button
          disabled={props.answer[3] === 0}
          onClick={handlePrevBtn}
          className={`w-full h-[60px] my-[30px] ${props.answer[3] !== 0 ? 'full-btn' : 'disabled-btn'}`}
        >
          이전질문
        </button>
        <button
          disabled={props.answer[4] === 0}
          onClick={handleNextBtn}
          className={`w-full h-[60px] my-[30px] ${props.answer[4] !== 0 ? 'full-btn' : 'disabled-btn'}`}
        >
          다음질문
        </button>
      </div>
    </motion.div>
  );
};

export default Q5;
