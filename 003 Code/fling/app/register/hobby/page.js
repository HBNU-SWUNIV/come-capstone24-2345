"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreHobby } from "../../../library/store";

const RegisterHobby = () => {
  const [hobby, setHobby] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const hobbyList = [
    ["영화", "movie"],
    ["독서", "book"],
    ["여행", "travel"],
    ["등산", "mountain"],
    ["전시회/박물관", "museum"],
    ["헬스/필라테스", "muscle"],
    ["수영", "swim"],
    ["봉사활동", "volunteer"],
    ["요리", "cooking"],
    ["원예", "flower"],
    ["러닝", "running"],
    ["노래", "microphone"],
    ["사이클", "cycle"],
    ["미술", "pallet"],
    ["사진촬영", "camera"],
    ["캠핑", "camping"],
    ["테니스", "tennis"],
    ["스키/보드", "ski"],
    ["낚시", "fishing"],
    ["게임", "game"],
    ["볼링", "bowling"],
    ["음주", "wine"],
    ["당구", "billiards"],
    ["탁구", "table-tennis"],
    ["농구", "basketball"],
    ["야구", "baseball"],
    ["축구", "soccer"],
  ];

  const router = useRouter();
  const dispatch = useDispatch();
  const userHobby = useSelector((state) => state.registerUserInfo.hobby);

  const isExist = (value) =>
    hobby.some((item) => JSON.stringify(item) === JSON.stringify(value));

  const handleHobby = (value) => {
    if (isExist(value)) {
      setHobby((prev) =>
        prev.filter((item) => JSON.stringify(item) !== JSON.stringify(value))
      );
    } else {
      setHobby((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    if (userHobby) {
      router.replace("/register/etc");
    }
  }, [userHobby]);

  const handleSubmit = () => {
    if (hobby.length !== 0) {
      setIsLoading(true);
      dispatch(setStoreHobby(hobby));
    } else {
      alert("취미를 한 가지 이상 선택해주세요");
    }
  };

  return (
    <div className="w-full h-dvh px-[40px] pt-[80px] pb-[120px]">
      <div className="size-full flex flex-col gap-[20px] relative">
        <div className="text-start w-3/5 flex flex-col gap-[10px]">
          <p className="text-title text-main-red">취미</p>
          <p className="text-subtitle break-keep text-gray-500">
            회원님의 취미를 한 가지 이상 선택해주세요
          </p>
        </div>

        <div className="w-full flex justify-center flex-wrap gap-[5px] p-[10px] overflow-y-scroll">
          {hobbyList.map((item) => {
            return (
              <button
                key={item[1]}
                onClick={() => handleHobby(item)}
                className={`flex justify-center items-center gap-[5px] px-[10px] h-[40px] ${isExist(item) ? "focus-btn" : "btn"}`}
              >
                <Image
                  src={`/register/hobby/unchecked/${item[1]}.svg`}
                  alt={item[1]}
                  width={20}
                  height={20}
                />
                <span>{item[0]}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          disabled={hobby.length === 0}
          className={`absolute bottom-[-80px] w-full left-0 ${hobby.length === 0 ? "btn" : "full-btn"} h-[50px] content-center cursor-pointer`}
        >
          {isLoading ? "확인중..." : "다음"}
        </button>
      </div>
    </div>
  );
};

export default RegisterHobby;
