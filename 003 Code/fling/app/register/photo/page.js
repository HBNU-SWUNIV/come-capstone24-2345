'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Accordion, AccordionItem } from '@nextui-org/react';
import imageCompression from 'browser-image-compression';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  setStoreProfileImg,
  setStoreStudentIDImg,
} from '../../../library/store';
import { storage } from '../../../firebase/firebaseDB';

const RegisterPhoto = () => {
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [studentIDImgFile, setStudentIDImgFile] = useState(null);
  const [profileImgSrc, setProfileImgSrc] = useState(null);
  const [studentIDImgSrc, setStudentIDImgSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.registerUserInfo.email);
  const userProfileImg = useSelector(
    (state) => state.registerUserInfo.profileImg
  );
  const userStudentIDImg = useSelector(
    (state) => state.registerUserInfo.studentIDImg
  );

  const handleProfileImg = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];
      setProfileImgFile(file);
      setProfileImgSrc(URL.createObjectURL(file));
    } else {
      return;
    }
  };

  const handleStudentIDImg = (e) => {
    if (e.target.files) {
      let file = e.target.files[0];
      setStudentIDImgFile(file);
      setStudentIDImgSrc(URL.createObjectURL(file));
    } else {
      return;
    }
  };

  useEffect(() => {
    if (userEmail && userProfileImg && userStudentIDImg) {
      router.replace('/register/account');
    }
  }, [userEmail, userProfileImg, userStudentIDImg]);

  const handleSubmit = async () => {
    if (profileImgFile && studentIDImgFile) {
      setIsLoading(true);
      const compressedProfileBlob = await imageCompression(profileImgFile, {
        maxSizeMB: 1,
      });
      const compressedStudentIDBlob = await imageCompression(studentIDImgFile, {
        maxSizeMB: 1,
      });

      const compressedProfileFile = new File(
        [compressedProfileBlob],
        profileImgFile.name,
        { type: profileImgFile.type }
      );
      const compressedStudentIDFile = new File(
        [compressedStudentIDBlob],
        studentIDImgFile.name,
        { type: studentIDImgFile.type }
      );

      const storageProfileRef = ref(storage, `images/profile/${userEmail}`);
      const storageStudentIDRef = ref(storage, `images/studentID/${userEmail}`);

      await uploadBytes(storageProfileRef, compressedProfileFile);
      await uploadBytes(storageStudentIDRef, compressedStudentIDFile);

      const profileURL = await getDownloadURL(storageProfileRef);
      const studentIDURL = await getDownloadURL(storageStudentIDRef);

      setIsLoading(true);
      dispatch(setStoreProfileImg(profileURL));
      dispatch(setStoreStudentIDImg(studentIDURL));
    } else if (!userEmail) {
      alert('잘못된 접근입니다');
      router.replace('/');
    } else {
      setIsLoading(false);
      alert('프로필 사진과 학생증 사진 모두 등록해주세요');
    }
  };

  return (
    <div className='w-full h-dvh px-[40px] pt-[80px] pb-[120px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='text-start w-full flex flex-col gap-[10px]'>
          <p className='text-title text-main-red'>본인 확인</p>
          <div className='flex flex-col gap-[5px] text-gray-500'>
            <p className='text-subtitle'>회원님이 등록할 프로필 사진과</p>
            <p className='text-subtitle'>대학교 학생증 사진을 제출해주세요</p>
          </div>
        </div>

        <div className='w-full flex-1 flex gap-[20px] flex-col items-center overflow-y-scroll'>
          <div className='w-full flex gap-[20px]'>
            <div className='flex-1 flex flex-col gap-[10px]'>
              <div className='w-full aspect-square card-border bg-gray-50 rounded-medium relative'>
                {profileImgSrc ? (
                  <Image
                    src={profileImgSrc}
                    alt='profile'
                    fill
                    className='rounded-large p-[3px] size-full object-contain'
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
                  className='absolute bottom-[10px] right-[10px] p-[3px] rounded-medium box-content card-border bg-white cursor-pointer'
                >
                  <Image
                    src='/register/photo/add-photo.svg'
                    width={15}
                    height={15}
                    alt='add'
                  />
                </label>
              </div>
              <span className='text-info'>프로필</span>
            </div>

            <div className='flex-1 flex flex-col gap-[10px]'>
              <div className='w-full aspect-square card-border bg-gray-50 rounded-medium relative'>
                {studentIDImgSrc ? (
                  <Image
                    src={studentIDImgSrc}
                    alt='studentID'
                    fill
                    className='rounded-large p-[3px] size-full object-contain'
                  />
                ) : null}
                <input
                  type='file'
                  id='student-id-img'
                  hidden
                  onChange={handleStudentIDImg}
                  accept='image/jpeg, image/png, image/webp, image/bmp'
                />
                <label
                  htmlFor='student-id-img'
                  className='absolute bottom-[10px] right-[10px] p-[3px] rounded-medium box-content card-border bg-white cursor-pointer'
                >
                  <Image
                    src='/register/photo/add-photo.svg'
                    width={15}
                    height={15}
                    alt='add'
                  />
                </label>
              </div>
              <span className='text-info'>학생증</span>
            </div>
          </div>

          <Accordion
            isCompact
            className='px-0'
            itemClasses={{
              title: '!text-subtitle px-[10px]',
              content:
                'bg-white text-info text-start p-[20px] rounded-[15px] card-border',
            }}
          >
            <AccordionItem
              key='1'
              aria-label='student-id-card caution'
              title='학생증 참고사항'
            >
              <div className='flex flex-col gap-[10px]'>
                <p>실물 학생증 촬영또는 모바일 학생증 캡쳐만 가능</p>
                <p>이름과 얼굴이 뚜렷하게 보여야 함</p>
              </div>
            </AccordionItem>
          </Accordion>
          <Accordion
            isCompact
            className='px-0'
            itemClasses={{
              title: '!text-subtitle px-[10px]',
              content:
                'bg-white text-info text-start p-[20px] rounded-[15px] card-border',
            }}
          >
            <AccordionItem
              key='1'
              aria-label='profile image caution'
              title='프로필 사진 참고사항'
            >
              <div className='flex flex-col gap-[10px]'>
                <p>올리신 프로필은 매칭된 상대방에게 보입니다</p>
                <p>프로필 이미지는 자유롭게 가능합니다</p>
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <button
          onClick={handleSubmit}
          disabled={profileImgFile && studentIDImgFile ? false : true}
          className={`absolute bottom-[-80px] w-full left-0 h-[50px] ${profileImgFile && studentIDImgFile ? 'full-btn' : 'btn'} content-center cursor-pointer`}
        >
          {isLoading ? '전송중....' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default RegisterPhoto;
