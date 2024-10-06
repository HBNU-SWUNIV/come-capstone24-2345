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
    <>
      <motion.div
        variants={props.variants}
        initial='hidden'
        animate='enter'
        transition={props.easeInOut}
        className='w-full flex gap-[20px] flex-col items-center overflow-y-scroll'
      >
        <div className='w-full'>
          <img className='w-full h-[200px] bg-main-red' />
          <div className='text-start text-subtitle opacity-70 mt-[20px] text-gray-500'>
            <p>회원님이 연인과 여행을 가기로 했어요</p>
            <p>여행계획을 어떤 방식으로 세우시나요?</p>
          </div>
        </div>

        <div className='w-full flex flex-col gap-[20px]'>
          <button
            onClick={() => handleQuestion(1)}
            className={`text-subtitle w-full h-[50px] ${props.answer[4] == 1 ? 'focus-btn' : 'btn'}`}
          >
            서로의 관심사를 고려해 철저히 계획
          </button>
          <button
            onClick={() => handleQuestion(2)}
            className={`text-subtitle w-full h-[50px] ${props.answer[4] == 2 ? 'focus-btn' : 'btn'}`}
          >
            즉흥적으로 떠나 모험을 즐김
          </button>
          <button
            onClick={() => handleQuestion(3)}
            className={`text-subtitle w-full h-[50px] ${props.answer[4] == 3 ? 'focus-btn' : 'btn'}`}
          >
            연인이 원하는대로 계획을 맡김
          </button>
        </div>
      </motion.div>
      <div className='flex gap-[10px] absolute bottom-[-80px] w-full left-0'>
        <button
          disabled={props.answer[3] === 0}
          onClick={handlePrevBtn}
          className={`flex-1 h-[50px] content-center ${props.answer[3] !== 0 ? 'full-btn' : 'btn'}`}
        >
          이전질문
        </button>
        <button
          disabled={props.answer[4] === 0}
          onClick={handleNextBtn}
          className={`flex-1 h-[50px] content-center ${props.answer[4] !== 0 ? 'full-btn' : 'btn'}`}
        >
          다음질문
        </button>
      </div>
    </>
  );
};

export default Q5;
