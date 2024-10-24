"use client";

import { useSession } from "next-auth/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import styled from "styled-components";
import { Spinner } from "@nextui-org/spinner";
import axios from "axios";

const MainPage = () => {
  const [userInfo, setUserInfo] = useState();
  const [review, setReview] = useState("");
  const [reviewStar, setReviewStar] = useState(5);
  const [univLogoExist, setUnivLogoExist] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [totalGroup, setTotalGroup] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  const { data: session, status } = useSession();
  const {
    isOpen: isReviewOpen,
    onOpen: onReviewOpen,
    onOpenChange: onReviewOpenChange,
  } = useDisclosure();
  const {
    isOpen: isFortuneOpen,
    onOpen: onFortuneOpen,
    onOpenChange: onFortuneOpenChange,
  } = useDisclosure();

  const [isFortuneLoading, setIsFortuneLoading] = useState(false);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [fortuneContent, setFortuneContent] = useState();

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    speed: 200,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease",
    arrows: false,
  };

  const timeNextMonday9AM = () => {
    const now = new Date();
    let nextMonday = new Date();

    nextMonday.setDate(now.getDate() + ((8 - now.getDay()) % 7));
    nextMonday.setHours(9, 0, 0, 0);

    if (now >= nextMonday) {
      nextMonday.setDate(nextMonday.getDate() + 7);
    }

    const timeDiff = nextMonday - now;

    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    setTimeRemaining({
      day: days,
      hour: hours,
      minute: minutes,
      second: seconds,
    });
  };

  useEffect(() => {
    timeNextMonday9AM();
    const timer = setInterval(() => {
      timeNextMonday9AM();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchGroupCount = async () => {
      try {
        const result = await axios.get("/api/group/count");
        setTotalGroup(result.data);
      } catch (err) {
        alert(err.response.data);
      }
    };

    fetchGroupCount();
  }, []);

  useEffect(() => {
    const fetchReviewList = async () => {
      try {
        const result = await axios.get("/api/review/list");
        setReviewList(result.data);
      } catch (err) {
        setReviewList([]);
      }
    };
    fetchReviewList();
  }, [isReviewLoading]);

  useEffect(() => {
    if (!isReviewOpen) {
      setReview("");
      setReviewStar(5);
    }
  }, [isReviewOpen]);

  useEffect(() => {
    if (status === "authenticated") {
      setUserInfo(session.user);
    }
  }, [session, status]);

  const handleFortune = async () => {
    if (userInfo) {
      try {
        setIsFortuneLoading(true);
        const result = await axios.post("/api/fortune/today", {
          gender: userInfo.gender,
          birth: userInfo.birth,
          mbti: userInfo.mbti,
          datingType: userInfo.datingType,
          email: userInfo.email,
        });
        console.log(result.data.date);
        setFortuneContent(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    setIsFortuneLoading(false);
    onFortuneOpen();
  };

  const handleReview = async () => {
    if (userInfo) {
      try {
        const result = await axios.post("/api/review/check", {
          gender: userInfo.gender,
          nickname: userInfo.nickname,
        });
        onReviewOpen();
      } catch (err) {
        alert(err.response.data);
      }
    }
  };

  const handleReviewSubmit = async (onClose) => {
    if (userInfo) {
      if (review) {
        try {
          setIsReviewLoading(true);
          const result = await axios.post("/api/review/post", {
            nickname: userInfo.nickname,
            gender: userInfo.gender,
            review,
            score: reviewStar,
          });
          setIsReviewLoading(false);
          onClose();
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("리뷰를 작성해주세요");
      }
    } else {
      alert("잠시 후에 다시 시도해주세요");
    }
  };

  return (
    <>
      {userInfo && (
        <>
          <div className="w-full h-dvh bg-zinc-50 px-[40px] pt-[60px] text-start">
            <div className="w-full h-[calc(100vh_-_140px)] py-[20px] flex flex-col gap-[20px] overflow-y-scroll">
              <div className="flex items-center gap-[5px]">
                {univLogoExist ? (
                  <Image
                    src={`/main/home/univ/${userInfo.univ}.svg`}
                    width={25}
                    height={25}
                    alt={userInfo.univ}
                    onError={() => setUnivLogoExist(false)}
                  />
                ) : (
                  <span>🏫</span>
                )}
                <span>{userInfo.univ}</span>
                <span className="text-gray-500 text-info">
                  - {userInfo.nickname}님
                </span>
              </div>
              <div className="w-full flex gap-[20px] items-end">
                <div className="w-full flex flex-col gap-[20px] justify-between bg-white rounded-[15px] p-[20px] card-border">
                  <div className="w-full flex flex-col items-center gap-[10px]">
                    <span className="text-subtitle text-gray-500">
                      플링 이용 가능한 기간
                    </span>
                    <div className="w-full flex justify-center gap-[5px]">
                      <span>{timeRemaining.day}일</span>
                      <span>
                        {timeRemaining.hour < 10
                          ? `0${timeRemaining.hour}`
                          : timeRemaining.hour}
                      </span>
                      <span>:</span>
                      <span>
                        {timeRemaining.minute < 10
                          ? `0${timeRemaining.minute}`
                          : timeRemaining.minute}
                      </span>
                      <span>:</span>
                      <span>
                        {timeRemaining.second < 10
                          ? `0${timeRemaining.second}`
                          : timeRemaining.second}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleFortune}
                    className="full-btn h-[50px] py-[10px] w-full flex justify-center items-center"
                  >
                    {isFortuneLoading ? (
                      <Spinner
                        size="sm"
                        classNames={{
                          circle1: "border-b-white",
                          circle2: "border-b-white",
                        }}
                      />
                    ) : (
                      "운세 확인"
                    )}
                  </button>
                </div>
              </div>

              <div className="w-full flex flex-col gap-[20px]">
                <span>자주 묻는 질문들</span>
                <Accordion
                  variant="splitted"
                  isCompact
                  className="w-full !px-0"
                  itemClasses={{
                    base: "bg-white rounded-[15px] mb-[5px] !px-0 !shadow-none card-border",
                    trigger: "px-[20px]",
                    title: "text-subtitle",
                    content:
                      "!text-info px-[20px] pb-[20px] break-keep text-gray-500",
                  }}
                >
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="매칭은 어떤 방식으로 되는건가요?"
                  >
                    남자그룹, 여자그룹 각각 Fisher-Yates Shuffle 알고리즘을
                    이용하여 섞고 각 인덱스별로 일대일 매칭하는 방식을
                    이용합니다
                  </AccordionItem>
                  <AccordionItem
                    key="2"
                    aria-label="Accordion 2"
                    title="대학인증은 언제쯤 승인되나요?"
                  >
                    <p>1~2일 정도 소요됩니다.</p>
                    <p>최대한 빠르게 작업하도록 하겠습니다 (_ _)</p>
                  </AccordionItem>
                  <AccordionItem
                    key="3"
                    aria-label="Accordion 3"
                    title="이번주 선정된 유저는 몇 명인가요?"
                  >
                    {totalGroup ? (
                      <>
                        <p>{`총 ${totalGroup}그룹이 선정되었습니다.`}</p>
                        <p>매주 선정 인원은 랜덤이니 참고해주세요</p>
                      </>
                    ) : (
                      "불러오는 중입니다..."
                    )}
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="w-full flex flex-col gap-[20px]">
                <div className="flex gap-[20px] items-center">
                  <span>플링 사용 후기</span>
                  <button
                    onClick={handleReview}
                    className="bg-white flex items-center gap-[5px] px-[10px] py-[2px] text-info rounded-medium focus-btn"
                  >
                    <Image
                      src={"/main/home/pencil.svg"}
                      alt="write"
                      width={12}
                      height={12}
                    />
                    <span>후기 작성</span>
                  </button>
                </div>
                <div className="w-full h-[200px] flex justify-center items-center rounded-[15px] bg-white card-border">
                  {reviewList.length === 0 ? (
                    <span>아직 등록된 후기가 없습니다 T^T</span>
                  ) : (
                    <SliderContainer className="size-full p-[10px]">
                      <Slider
                        {...sliderSettings}
                        className="size-full flex flex-col"
                      >
                        {reviewList.map((item, index) => {
                          const checked = Array(item.score).fill();
                          const unchecked = Array(5 - item.score).fill();
                          const maskedNickname =
                            item.nickname.length > 2
                              ? item.nickname[0] +
                                "*".repeat(item.nickname.length - 2) +
                                item.nickname[item.nickname.length - 1]
                              : "*".repeat(item.nickname.length);
                          return (
                            <div
                              key={item}
                              className="w-full h-[200px] flex justify-center items-center relative"
                            >
                              <div className="absolute size-full flex flex-col p-[20px] gap-[20px]">
                                <div className="flex w-full h-fit justify-between">
                                  <div className="flex gap-[5px] items-center">
                                    <span className="text-subtitle">
                                      {maskedNickname}
                                    </span>
                                    <span className="text-gray-400 text-info">
                                      {item.gender === "man"
                                        ? "남학생"
                                        : "여학생"}
                                    </span>
                                  </div>
                                  <div className="flex">
                                    {checked.map((_, idx) => (
                                      <Image
                                        key={item + item.score + idx}
                                        src={"/main/home/checked-star.svg"}
                                        alt="check"
                                        width={20}
                                        height={20}
                                      />
                                    ))}
                                    {unchecked.map((_, idx) => (
                                      <Image
                                        key={item + item.score + idx}
                                        src={"/main/home/unchecked-star.svg"}
                                        alt="uncheck"
                                        width={20}
                                        height={20}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="flex-1 w-full text-subtitle">
                                  <span className="break-words break-keep">
                                    {item.review}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Slider>
                    </SliderContainer>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Modal
            className="w-4/5"
            isOpen={isReviewOpen}
            placement="center"
            onOpenChange={onReviewOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    자유롭게 작성해주세요
                  </ModalHeader>
                  <ModalBody>
                    <div className="w-full px-[10px]">
                      {[1, 2, 3, 4, 5].map((score) => {
                        return (
                          <button
                            key={"star-" + score}
                            onClick={() => setReviewStar(score)}
                          >
                            {score <= reviewStar ? (
                              <Image
                                src={"/main/home/checked-star.svg"}
                                alt="check"
                                width={30}
                                height={30}
                              />
                            ) : (
                              <Image
                                src={"/main/home/unchecked-star.svg"}
                                alt="uncheck"
                                width={30}
                                height={30}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <Textarea
                      variant="bordered"
                      label="사용 후기 (최대 100자)"
                      minRows={3}
                      maxRows={5}
                      maxLength={100}
                      value={review}
                      onValueChange={setReview}
                      classNames={{
                        base: "card-border rounded-medium",
                        inputWrapper: "rounded-0 shadow-none",
                        input: "pr-[20px]",
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <button
                      onClick={onClose}
                      className="px-[20px] py-[5px] btn"
                    >
                      취소
                    </button>
                    <button
                      disabled={review === ""}
                      onClick={() => handleReviewSubmit(onClose)}
                      className={`${review !== "" ? "full-btn" : "btn"} px-[20px] py-[5px]`}
                    >
                      {isReviewLoading ? (
                        <Spinner
                          size="sm"
                          classNames={{
                            circle1: "border-b-white",
                            circle2: "border-b-white",
                          }}
                        />
                      ) : (
                        "제출"
                      )}
                    </button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal
            className="w-3/4"
            isOpen={isFortuneOpen}
            placement="center"
            onOpenChange={onFortuneOpenChange}
            hideCloseButton
            classNames={{
              base: "bg-transparent flex justify-center items-center w-fit shadow-none",
            }}
          >
            <ModalContent>
              {(onClose) => (
                <div className="w-full flex justify-center items-center bg-white/90 aspect-[1/1.58] relative">
                  <Image
                    src="/main/home/fortune-card.png"
                    alt="fortune-card"
                    fill
                    className="object-fill opacity-20"
                  />
                  {fortuneContent && (
                    <div className="size-full p-[25px] flex flex-col gap-[20px]">
                      <span className="w-full text-center">
                        이번주 연애운세
                      </span>
                      <span className="w-full text-end text-info text-gray-500">{`${fortuneContent.date.year}-${fortuneContent.date.month}-${fortuneContent.date.day} ${fortuneContent.date.hour < 10 ? `0${fortuneContent.date.hour}` : fortuneContent.date.hour}시 ${fortuneContent.date.min < 10 ? `0${fortuneContent.date.min}` : fortuneContent.date.min}분 기준`}</span>
                      <span className="w-full flex-1 mt-[20px] text-subtitle break-keep break-words leading-relaxed overflow-y-scroll">
                        {fortuneContent.content}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default MainPage;

const SliderContainer = styled.div`
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 3px;
    padding: 0;
    position: relative;
  }
`;
