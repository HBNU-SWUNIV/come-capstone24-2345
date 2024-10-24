import { motion } from "framer-motion";
import Image from "next/image";

const Q2 = (props) => {
  const handleQuestion = (ans) => {
    let copy = [...props.answer];
    copy[1] = ans;
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
        initial="hidden"
        animate="enter"
        transition={props.easeInOut}
        className="w-full flex gap-[20px] flex-col items-center overflow-y-scroll"
      >
        <div className="w-full">
          <div className="w-full h-[180px] relative">
            <Image
              src={"/register/datingType/Q2.png"}
              alt="Q2"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-start text-subtitle opacity-70 mt-[20px] text-gray-500">
            <p>회원님의 연인과 갈등이 생겼을 때</p>
            <p>회원님은 어떻게 해결하시나요?</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[20px]">
          <button
            onClick={() => handleQuestion(1)}
            className={`text-subtitle w-full h-[50px] ${props.answer[1] == 1 ? "focus-btn" : "btn"}`}
          >
            깊은 대화를 통해 감정을 표현하고 해결
          </button>
          <button
            onClick={() => handleQuestion(2)}
            className={`text-subtitle w-full h-[50px] ${props.answer[1] == 2 ? "focus-btn" : "btn"}`}
          >
            논리적으로 문제를 분석하고 해결책을 제시
          </button>
          <button
            onClick={() => handleQuestion(3)}
            className={`text-subtitle w-full h-[50px] ${props.answer[1] == 3 ? "focus-btn" : "btn"}`}
          >
            시간이 해결해 줄 것이라 믿고 기다림
          </button>
        </div>
      </motion.div>
      <div className="flex gap-[10px] absolute bottom-[-80px] w-full left-0">
        <button
          disabled={props.answer[0] === 0}
          onClick={handlePrevBtn}
          className={`flex-1 h-[50px] content-center ${props.answer[0] !== 0 ? "full-btn" : "btn"}`}
        >
          이전질문
        </button>
        <button
          disabled={props.answer[1] === 0}
          onClick={handleNextBtn}
          className={`flex-1 h-[50px] content-center ${props.answer[1] !== 0 ? "full-btn" : "btn"}`}
        >
          다음질문
        </button>
      </div>
    </>
  );
};

export default Q2;
