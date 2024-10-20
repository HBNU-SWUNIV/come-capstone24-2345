"use client";

import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Divider } from "@nextui-org/divider";
import { useEffect, useState } from "react";
import Image from "next/image";
import MainSlider from "./MainSlider";
import axios from "axios";

const StartPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(null);
  const {
    isOpen: isInstallOpen,
    onOpen: onInstallOpen,
    onOpenChange: onInstallOpenChange,
  } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onOpenChange: onFormOpenChange,
  } = useDisclosure();
  const [gender, setGender] = useState("man");
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (!isFormOpen) {
      setIsSubmit(false);
    }
  }, [isFormOpen]);

  useEffect(() => {
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    setIsIOS(isDeviceIOS);

    isDeviceIOS && onInstallOpen();

    const beforeInstallPromptHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      onInstallOpen();
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        alert("홈 화면에 설치되었습니다!");
      } else {
        onInstallOpenChange(false);
      }
      setDeferredPrompt(null);
      onInstallOpenChange(false);
    }
  };

  const handleSubmit = async () => {
    await axios
      .post("/api/apply/form", { email, gender })
      .then((res) => {
        setIsSubmit(true);
        setGender("man");
        setEmail("");
      })
      .catch((err) => {
        setGender("man");
        setEmail("");
        alert(err.response.data);
      });
  };

  return (
    <div className="w-full h-screen px-[40px] flex flex-col relative">
      <header className="absolute w-full h-[60px] flex justify-between items-center px-[30px] py-[15px] z-1 left-0">
        <div className="w-[30px] h-full relative">
          <Image src="/logo/main-logo.svg" alt="main-logo" fill />
        </div>
        <div className="flex h-[20px] gap-[10px] items-center">
          <button onClick={onInstallOpen} className={`text-info text-main-red`}>
            인앱 설치
          </button>
          <Divider orientation="vertical" />
          <button
            onClick={() => {
              onFormOpen();
            }}
            className="text-info text-main-red"
          >
            코드 신청
          </button>
        </div>
      </header>

      {/* 웹앱 설치 모달창 */}
      <Modal
        className="w-4/5 z-2"
        isOpen={isInstallOpen}
        placement="top"
        onOpenChange={onInstallOpenChange}
        classNames={{
          closeButton: "hidden",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-[15px] text-info">
                {isIOS ? (
                  <>
                    <p className="text-center">
                      Fling은 앱에서 원활하게 사용하실 수 있습니다
                    </p>
                    <div className="text-start w-full flex flex-col gap-[5px]">
                      <div className="flex items-center gap-[5px]">
                        <p>1.</p>
                        <Image
                          src="/install/share.svg"
                          width={15}
                          height={15}
                          alt="shared-button"
                        />
                        <p>공유버튼 클릭</p>
                      </div>
                      <div className="flex items-center gap-[5px]">
                        <p>2.</p>
                        <Image
                          src="/install/plus-box.svg"
                          width={15}
                          height={15}
                          alt="plus-button"
                        />
                        <p>"홈 화면에 추가하기" 클릭</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full flex flex-col gap-[10px] items-center">
                    <p className="text-center">
                      Fling은 앱에서 원활하게 사용하실 수 있습니다
                    </p>
                    <button
                      className="full-btn w-fit px-[20px] h-[40px]"
                      onClick={handleInstallClick}
                    >
                      홈 화면에 추가하기
                    </button>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* 코드신청 모달창 */}
      <Modal
        className="w-4/5 z-[99999]"
        isOpen={isFormOpen}
        placement="center"
        onOpenChange={onFormOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isSubmit ? "제출 완료" : "사용 신청"}
              </ModalHeader>
              <ModalBody className="text-info">
                {isSubmit ? (
                  <>
                    <p>정상적으로 제출되었어요!</p>
                    <p>선정되시면 해당 이메일로 이벤트 코드를 전송해드려요</p>
                    <p>코드는 매주 월요일 오전 9시 10분에 전송합니다</p>
                  </>
                ) : (
                  <>
                    <p>플링에 오신 것을 환영해요!</p>
                    <p>이벤트 코드를 받으신 분만 저희 웹앱에 가입이 가능해요</p>
                    <p>아래에 학교 이메일과 성별을 작성해주세요</p>
                    <p>성별은 변경할 수 없으니 정확하게 기입해주세요</p>
                    <p className="text-main-red">
                      현재는 한밭대학교 학생을 대상으로만 서비스 진행
                    </p>
                    <Divider className="my-2" />
                    <RadioGroup
                      label="성별"
                      orientation="horizontal"
                      value={gender}
                      color="danger"
                      onValueChange={setGender}
                      classNames={{
                        wrapper: "w-full flex justify-around",
                      }}
                    >
                      <Radio
                        classNames={{
                          label: "!text-subtitle",
                          wrapper: "!size-[15px]",
                          control: "!size-[5px]",
                        }}
                        value="man"
                      >
                        남학생
                      </Radio>
                      <Radio
                        classNames={{
                          label: "!text-subtitle",
                          wrapper: "!size-[15px]",
                          control: "!size-[5px]",
                        }}
                        value="woman"
                      >
                        여학생
                      </Radio>
                    </RadioGroup>
                    <Input
                      isRequired
                      type="email"
                      label="Email"
                      placeholder="abc@univ.ac.kr"
                      variant="underlined"
                      className="max-w-xs"
                      value={email}
                      onValueChange={setEmail}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {isSubmit ? (
                  <button
                    onClick={() => {
                      onClose();
                    }}
                    className="w-full h-[50px] full-btn"
                  >
                    확인
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="w-full h-[50px] full-btn"
                  >
                    제출하기
                  </button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full flex-1 pt-[60px] pb-[40px] content-center">
        <MainSlider />
      </div>

      <div className="w-full h-[150px] gap-[10px] flex flex-col justify-start items-center">
        <Link
          href="/register/code"
          className="size-full h-[50px] flex justify-center items-center full-btn"
        >
          플링 시작하기
        </Link>
        <div className="w-full flex gap-[10px] justify-center text-subtitle">
          <p>이미 계정이 있으신가요?</p>
          <Link className="text-main-red" href={"/login"}>
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
