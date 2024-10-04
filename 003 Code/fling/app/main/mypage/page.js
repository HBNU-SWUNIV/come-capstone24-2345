'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Divider } from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import imageCompression from 'browser-image-compression';
import { storage } from '../../../firebase/firebaseDB';

import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const MypagePage = () => {
  const { data: session, status } = useSession();
  const date = new Date();
  const [userImg, setUserImg] = useState();

  const [sessionInfo, setSessionInfo] = useState(null);
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const [isSubmitImg, setIsSubmitImg] = useState(false);
  const {
    isOpen: isEditImgOpen,
    onOpen: onEditImgOpen,
    onOpenChange: onEditImgOpenChange,
  } = useDisclosure();

  const router = useRouter();

  const fetchUserImg = async () => {
    if (sessionInfo.email) {
      await axios
        .post('/api/chat/profileImg', { email: sessionInfo.email })
        .then((res) => {
          setUserImg(res.data);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setSessionInfo(session.user);
    }
  }, [session, status]);

  useEffect(() => {
    if (profileImgFile) {
      onEditImgOpen();
    }
  }, [profileImgFile]);

  useEffect(() => {
    if (sessionInfo || isSubmitImg) {
      fetchUserImg();
    }
  }, [sessionInfo, isSubmitImg]);

  const infoComponent = (key, value) => {
    return (
      <div className='flex'>
        <span className='text-subtitle text-gray-700 flex-1 text-start'>
          {key}
        </span>
        <div className='text-subtitle w-[75%] text-start'>{value}</div>
      </div>
    );
  };

  const handleProfileImg = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];
      setProfileImgFile(file);
      setProfileImgUrl(URL.createObjectURL(file));
    } else {
      return;
    }
  };

  const handleProfileImgSubmit = async (onClose) => {
    if (profileImgFile) {
      const compressedImgBlob = await imageCompression(profileImgFile, {
        maxSizeMB: 1,
      });
      const compressedImgFile = new File(
        [compressedImgBlob],
        profileImgFile.name,
        {
          type: profileImgFile.type,
        }
      );

      const storageRef = ref(storage, `images/profile/${sessionInfo.email}}`);
      await uploadBytes(storageRef, compressedImgFile);
      const url = await getDownloadURL(storageRef);

      await axios
        .post('/api/edit/profileImg', {
          email: sessionInfo.email,
          imgSrc: url,
        })
        .then((res) => {
          setIsSubmitImg(true);
          setUserImg(url);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
    setProfileImgFile(null);
    setProfileImgUrl(null);
    setIsSubmitImg(false);
    onClose();
  };

  if (sessionInfo) {
    return (
      <div className='w-full h-fit bg-gray-50 px-[40px]'>
        <div className='size-full flex flex-col gap-[20px] items-center pt-[230px]'>
          <div className='absolute top-[60px] w-full bg-white flex flex-col gap-[10px] px-[40px] py-[20px] border-b border-solid border-slate-200'>
            <div className='w-full flex gap-[20px]'>
              <div className='size-[100px] card-border text-white rounded-medium relative'>
                {userImg ? (
                  <Image
                    src={userImg}
                    alt='profile'
                    fill
                    className='rounded-large p-[3px] size-full'
                  />
                ) : null}
                <input
                  type='file'
                  id='profile-img'
                  hidden
                  onChange={handleProfileImg}
                  accept='image/jpeg, image/png, image/webp, image/bmp'
                />
                <label
                  htmlFor='profile-img'
                  className='absolute bottom-[5px] right-[5px] p-[3px] rounded-full box-content card-border bg-white cursor-pointer'
                >
                  <Image
                    src='/main/mypage/pencil.svg'
                    width={15}
                    height={15}
                    alt='수정'
                  />
                </label>
              </div>
              <div className='text-start flex flex-col justify-around'>
                <div className='flex gap-[5px]'>
                  <span>{sessionInfo.nickname}님</span>
                  <span>
                    {date.getFullYear() - sessionInfo.birth.year + 1}살
                  </span>
                </div>
                <div className='h-fit flex gap-[5px] text-subtitle text-gray-500'>
                  <span>{sessionInfo.univ}</span>
                  <Divider orientation='vertical' />
                  <span>{sessionInfo.department}</span>
                </div>
                <div className='w-full h-[20px] flex items-center gap-[5px]'>
                  <div className='size-[20px] relative'>
                    <Image
                      src={`/main/mypage/check-${sessionInfo.univCert.toString()}.svg`}
                      fill
                      alt={`check-${sessionInfo.univCert.toString()}`}
                    />
                  </div>
                  <span
                    className={
                      sessionInfo.univCert ? 'text-[#4ECB71]' : 'text-main-red'
                    }
                  >
                    {sessionInfo.univCert ? '대학인증 완료' : '대학인증 미완료'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px] card-border'>
            <div className='w-full flex justify-between items-center'>
              <span>나의 정보</span>
              <button
                className='flex gap-[5px] px-[10px] py-[5px] justify-center items-center btn'
                onClick={() => router.replace('/main/mypage/edit/myinfo')}
              >
                <Image
                  src='/main/mypage/pencil.svg'
                  width={15}
                  height={15}
                  alt='수정'
                />
                <span className='text-info'>수정</span>
              </button>
            </div>
            <div className='flex flex-col gap-[10px]'>
              {infoComponent('학교', sessionInfo.univ)}
              {infoComponent('학과', sessionInfo.department)}
              {infoComponent('키', `${sessionInfo.height}cm`)}
              {infoComponent('종교', '무교')}
              {infoComponent('MBTI', sessionInfo.mbti.join(''))}
              {infoComponent(
                '흡연/음주',
                `${sessionInfo.smoking === 'smoking' ? '흡연자' : '비흡연자'} / ${sessionInfo.drinkLimit === 0 ? '술을 못하는 편' : `${sessionInfo.drinkLimit}병 정도`}`
              )}
              {infoComponent(
                '군필여부',
                `${sessionInfo.army ? '군필자' : '미필자'}`
              )}
            </div>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px] card-border'>
            <div className='w-full flex justify-between items-center'>
              <span>한 줄 소개</span>
              <button
                className='flex gap-[5px] px-[10px] py-[5px] justify-center items-center btn'
                onClick={() => router.replace('/main/mypage/edit/myintro')}
              >
                <Image
                  src='/main/mypage/pencil.svg'
                  width={15}
                  height={15}
                  alt='수정'
                />
                <span className='text-info'>수정</span>
              </button>
            </div>
            <span className='text-subtitle text-start'>
              {sessionInfo.introduction}
            </span>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px] card-border'>
            <div className='w-full flex justify-between items-center'>
              <span>연애 유형</span>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <span className='text-subtitle text-start'>
                {sessionInfo.datingType.type}
              </span>
              <span className='text-info text-start'>
                {sessionInfo.datingType.description}
              </span>
            </div>
          </div>

          <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px] card-border'>
            <div className='w-full flex justify-between items-center'>
              <span>취미</span>
              <button
                className='flex gap-[5px] px-[10px] py-[5px] justify-center items-center btn'
                onClick={() => router.replace('/main/mypage/edit/myhobby')}
              >
                <Image
                  src='/main/mypage/pencil.svg'
                  width={15}
                  height={15}
                  alt='수정'
                />
                <span className='text-info'>수정</span>
              </button>
            </div>
            <div className='text-subtitle text-start w-full flex flex-wrap gap-[5px]'>
              {sessionInfo.hobby.map((hobby) => {
                return (
                  <button
                    key={hobby}
                    className={`flex justify-center items-center gap-[5px] px-[12px] py-[8px] btn`}
                  >
                    <Image
                      src={`/register/hobby/unchecked/${hobby[1]}.svg`}
                      alt={hobby[1]}
                      width={20}
                      height={20}
                    />
                    <span>{hobby[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='w-full h-[100px]'></div>
        </div>

        {/* 유저 프로필사진 변경 모달 */}
        <Modal
          isOpen={isEditImgOpen}
          placement={'center'}
          onOpenChange={onEditImgOpenChange}
          className='w-4/5'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  프로필 사진 변경
                </ModalHeader>
                <ModalBody>
                  {profileImgUrl && (
                    <div className='w-full min-h-[200px] max-h-[300px] relative'>
                      <Image
                        src={profileImgUrl}
                        fill
                        className='object-contain'
                        alt={profileImgFile.name}
                      />
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <button onClick={onClose} className='btn px-[20px] py-[5px]'>
                    닫기
                  </button>
                  <button
                    onClick={() => handleProfileImgSubmit(onClose)}
                    className='full-btn px-[20px] py-[5px]'
                  >
                    변경
                  </button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
};

export default MypagePage;

// const Modal = styled.div``;
