"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@nextui-org/switch";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { signOut, useSession } from "next-auth/react";
import { Textarea } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import deleteAccountHandler from "../../../hooks/deleteAccount";
import Link from "next/link";
import { getTokenHandler } from "@/firebase/firebaseDB";
import { registerServiceWorker } from "@/hooks/notifications";

const SettingPage = () => {
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [permission, setPermission] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onOpenChange: onAlertOpenChange,
  } = useDisclosure();

  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      setUserInfo(session.user);
    }
  }, [session, status]);

  const checkPermission = () => {
    registerServiceWorker();
    if (Notification.permission === "granted") {
      alert("알림이 이미 허용되어 있습니다");
      setPermission(true);
      userInfo && getTokenHandler(userInfo.email);
    } else if (Notification.permission === "denied") {
      alert("알림이 차단되어 있어 브라우저 설정에서 알림 권한을 허용해주세요");
      setPermission(false);
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          alert("알림 권한이 허용되었습니다");
          setPermission(true);
          userInfo && getTokenHandler(userInfo.email);
        } else {
          alert("알림 권한이 차단되었습니다");
          setPermission(false);
        }
      });
    }
  };

  useEffect(() => {
    if (Notification.permission === "granted") {
      setPermission(true);
    } else {
      setPermission(false);
    }
  }, []);

  const handleInquiry = async () => {
    await axios
      .post("/api/setting/inquiry", {
        email: userInfo.email,
        nickname: userInfo.nickname,
        inquiryTitle,
        inquiryContent,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("정상적으로 처리되었습니다!");
          setInquiryTitle("");
          setInquiryContent("");
        }
      })
      .catch((err) => {
        alert(err.response.data);
        setInquiryTitle("");
        setInquiryContent("");
      });
  };

  const handleWithdraw = async (closeModal) => {
    if (userInfo.email) {
      setIsLoadingWithdraw(true);
      try {
        await deleteAccountHandler(userInfo.email);
        await signOut();
        setIsWithdraw(true);
        setIsLoadingWithdraw(false);
        router.replace("/");
      } catch (err) {
        setIsWithdraw(false);
        setIsLoadingWithdraw(false);
        alert(err.response.data);
      }
    } else {
      alert("잠시 후에 다시 시도해주세요");
    }
  };

  return (
    <div className="w-full h-screen px-[40px] pt-[80px] flex flex-col gap-[10px] text-start bg-gray-50">
      {/* 탈퇴 모달창 */}
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent className="w-4/5">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                정말 탈퇴하실 건가요?
              </ModalHeader>
              <ModalBody className="text-info gap-[5px]">
                {isWithdraw ? (
                  <p>이용해주셔서 감사합니다</p>
                ) : (
                  <>
                    <p>회원님의 채팅내역 및 모든 정보들은 삭제됩니다.</p>
                    <p>플링을 다시 이용하시려면 재신청을 해아합니다.</p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {isWithdraw ? null : (
                  <>
                    <button
                      onClick={onClose}
                      className="btn px-[20px] py-[5px]"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => {
                        handleWithdraw(onClose);
                      }}
                      className="full-btn px-[20px] py-[5px] flex justify-center items-center"
                    >
                      {isLoadingWithdraw ? (
                        <Spinner
                          size="sm"
                          classNames={{
                            circle1: "border-b-white",
                            circle2: "border-b-white",
                          }}
                        />
                      ) : (
                        "탈퇴"
                      )}
                    </button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* 알림해제 모달창 */}
      <Modal
        isOpen={isAlertOpen}
        placement="center"
        onOpenChange={onAlertOpenChange}
      >
        <ModalContent className="w-4/5">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                알림 해제 방법
              </ModalHeader>
              <ModalBody className="text-info gap-[5px]">
                <p>
                  Chrome: 설정 &lt; 개인정보 및 보안 &lt; 사이트 설정 &lt; 권한
                  &lt; 알림
                </p>
                <p>
                  Firefox: 옵션 &lt; 개인정보 및 보안 &lt; 권한 &lt; 알림 설정
                </p>
                <p>Safari: Safari &lt; 환경설정 &lt; 웹사이트 &lt; 알림</p>
              </ModalBody>
              <ModalFooter>
                <button
                  onClick={onClose}
                  className="full-btn px-[20px] py-[5px]"
                >
                  닫기
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex justify-between items-center px-[20px] py-[10px] bg-white rounded-[15px] card-border">
        <div className="flex flex-col gap-[5px]">
          <span>채팅 알림</span>
          <div className="text-info">
            {/* <span className="text-gray-500">PUSH 알림 기능 on/off </span> */}
            <span className="text-gray-400 ml-[2px]">
              하단의 알림 권한버튼을 눌러주세요
            </span>
          </div>
        </div>
        <Switch
          aria-label="채팅 알림"
          color="danger"
          classNames={{
            wrapper: "m-0",
          }}
          isDisabled
          onClick={() =>
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                alert("알림 권한이 허용되었습니다");
                setPermission(true);
                userInfo && getTokenHandler(userInfo.email);
              } else {
                alert("알림 권한이 차단되었습니다");
                setPermission(false);
              }
            })
          }
          isSelected={permission}
          // onValueChange={setPermission}
        />
      </div>

      <button
        onClick={() => router.replace("/main/setting/inquiry")}
        className="flex flex-col px-[20px] py-[10px] bg-white rounded-[15px] card-border"
      >
        <div className="flex flex-col text-start gap-[5px]">
          <span>Q&A</span>
          <span className="text-info text-gray-500">회원님의 문의 내역</span>
        </div>
      </button>

      <Accordion isCompact className="px-0 w-full">
        <AccordionItem
          key="1"
          aria-label="문의하기"
          title="문의하기"
          className="relative"
          classNames={{
            base: "bg-white px-[20px] py-[10px] rounded-[15px] card-border",
            title: "",
            content: "bg-white text-info p-0 rounded-[15px]",
          }}
        >
          <Textarea
            variant="bordered"
            label="제목"
            maxRows={1}
            value={inquiryTitle}
            onValueChange={setInquiryTitle}
            classNames={{
              inputWrapper: "rounded-0 shadow-none",
              input: "pr-[30px]",
            }}
          />
          <Divider />
          <Textarea
            variant="bordered"
            label="문의하실 내용"
            minRows={1}
            maxRows={5}
            value={inquiryContent}
            onValueChange={setInquiryContent}
            classNames={{
              inputWrapper: "rounded-0 shadow-none",
              input: "pr-[20px]",
            }}
          />
          <Image
            onClick={handleInquiry}
            className="absolute bottom-[20px] right-[20px] cursor-pointer"
            src="/main/setting/send.svg"
            width={25}
            height={25}
            alt="send"
          />
        </AccordionItem>
      </Accordion>

      <button className="flex flex-col px-[20px] py-[10px] bg-white rounded-[15px] card-border">
        <div className="flex flex-col text-start gap-[5px]">
          <span className="text-gray-700">버전</span>
          <span className="text-info text-gray-500">v1.0.0</span>
        </div>
      </button>

      <div className="w-full flex px-[20px] py-[10px] justify-around items-center text-info text-gray-500">
        <button
          className="underline"
          onClick={async () => {
            await signOut();
            router.replace("/");
          }}
        >
          로그아웃
        </button>
        <button
          className="underline flex items-start"
          onClick={checkPermission}
        >
          <span>알림 권한</span>
          <span>
            <Image
              src="/main/setting/bell.svg"
              alt="bell"
              width={15}
              height={15}
            />
          </span>
        </button>
        <button onClick={onAlertOpen} className="underline">
          알림 해제
        </button>
        <button className="underline" onClick={onOpen}>
          탈퇴하기
        </button>
        {userInfo && userInfo.role === "admin" && (
          <Link className="underline" href={"/admin"}>
            관리자모드
          </Link>
        )}
      </div>
    </div>
  );
};

export default SettingPage;
