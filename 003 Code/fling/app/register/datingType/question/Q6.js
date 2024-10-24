import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setStoreDatingType } from "../../../../library/store";
import Image from "next/image";

const Q6 = (props) => {
  const [showResult, setShowResult] = useState(false);
  const [datingType, setDatingType] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const userDatingType = useSelector(
    (state) => state.registerUserInfo.datingType
  );

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    showResult && onOpen();
  }, [showResult, datingType]);

  const handleQuestion = (ans) => {
    let copy = [...props.answer];
    copy[5] = ans;
    props.setAnswer(copy);
  };

  useEffect(() => {
    if (userDatingType) {
      router.replace("/register/introduction");
    }
  }, [userDatingType]);

  const handleShowResult = async () => {
    try {
      const result = await axios.post("/api/register/datingType", {
        tendency: props.answer,
      });

      setShowResult(true);
      setDatingType(result.data);
    } catch (err) {
      alert(err.response.data);
    }
  };

  const handlePrevBtn = () => {
    props.setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsLoading(true);
    dispatch(setStoreDatingType(datingType));
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
              src={"/register/datingType/Q6.png"}
              alt="Q6"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-start text-subtitle opacity-70 mt-[20px] text-gray-500">
            <p>회원님이 연인과 의견이 다를 때</p>
            <p>회원님은 어떻게 하시나요?</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[20px]">
          <button
            onClick={() => handleQuestion(1)}
            className={`text-subtitle w-full h-[50px] ${props.answer[5] == 1 ? "focus-btn" : "btn"}`}
          >
            연인의 의견을 존중하며 대화를 나눔
          </button>
          <button
            onClick={() => handleQuestion(2)}
            className={`text-subtitle w-full h-[50px] ${props.answer[5] == 2 ? "focus-btn" : "btn"}`}
          >
            연인의 의견을 이해하고 노력하며 때로는 양보
          </button>
          <button
            onClick={() => handleQuestion(3)}
            className={`text-subtitle w-full h-[50px] ${props.answer[5] == 3 ? "focus-btn" : "btn"}`}
          >
            자신의 의견을 주장하는 편
          </button>
        </div>
      </motion.div>
      <div className="flex gap-[10px] absolute bottom-[-80px] w-full left-0">
        <button
          disabled={props.answer[4] === 0}
          onClick={handlePrevBtn}
          className={`flex-1 h-[50px] content-center ${props.answer[4] !== 0 ? "full-btn" : "btn"}`}
        >
          이전질문
        </button>
        <button
          disabled={
            props.answer[5] === 0 || props.answer.some((ans) => ans === 0)
          }
          onClick={handleShowResult}
          className={`flex-1 h-[50px] content-center ${props.answer[5] !== 0 ? "full-btn" : "btn"}`}
        >
          결과확인
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        placement="center"
        className="w-4/5"
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                회원님의 연애 유형
              </ModalHeader>
              <ModalBody>
                <p className="text-subtitle text-main-red">{datingType.type}</p>
                <p className="text-info break-keep">{datingType.description}</p>
              </ModalBody>
              <ModalFooter>
                <button
                  className="full-btn px-[20px] py-[5px]"
                  onClick={handleNext}
                >
                  {isLoading ? "확인중" : "다음"}
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Q6;
