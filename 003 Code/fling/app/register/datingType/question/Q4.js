import { motion } from 'framer-motion';

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
            <p>회원님의 연인께서 기분이 좋지 않을 때</p>
            <p>회원님은 어떻게 해결하시나요?</p>
          </div>
        </div>

        <div className='w-full flex flex-col gap-[20px]'>
          <button
            onClick={() => handleQuestion(1)}
            className={`text-subtitle w-full h-[50px] ${props.answer[3] == 1 ? 'focus-btn' : 'btn'}`}
          >
            따뜻한 위로와 관심을 보여줌
          </button>
          <button
            onClick={() => handleQuestion(2)}
            className={`text-subtitle w-full h-[50px] ${props.answer[3] == 2 ? 'focus-btn' : 'btn'}`}
          >
            기분 전환을 위해 새로운 활동을 제안
          </button>
          <button
            onClick={() => handleQuestion(3)}
            className={`text-subtitle w-full h-[50px] ${props.answer[3] == 3 ? 'focus-btn' : 'btn'}`}
          >
            연인의 공간을 존중하며 혼자있을 시간을 줌
          </button>
        </div>
      </motion.div>
      <div className='flex gap-[10px] absolute bottom-[-80px] w-full left-0'>
        <button
          disabled={props.answer[2] === 0}
          onClick={handlePrevBtn}
          className={`flex-1 h-[50px] content-center ${props.answer[2] !== 0 ? 'full-btn' : 'btn'}`}
        >
          이전질문
        </button>
        <button
          disabled={props.answer[3] === 0}
          onClick={handleNextBtn}
          className={`flex-1 h-[50px] content-center ${props.answer[3] !== 0 ? 'full-btn' : 'btn'}`}
        >
          다음질문
        </button>
      </div>
    </>
  );
};

export default Q4;
