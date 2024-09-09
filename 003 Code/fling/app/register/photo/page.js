'use client';

import {
  setGlobalIDCardImg,
  setGlobalProfileImg,
} from '../../../library/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const RegisterPhoto = () => {
  const [profileSrc, setProfileSrc] = useState(null);
  const [studentIDSrc, setStudentIDSrc] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.registerUserInfo);

  const handlePhoto = async (e, photoType) => {
    let file = e.target.files[0];
    if (file.type.includes('svg')) {
      alert('svg 이미지 파일은 지원하지 않습니다');
      return;
    }
    let arr = file.name.split('.');
    let fileExtension = arr[arr.length - 1];

    let renamedFile = new File(
      [file],
      `${userInfo.email}_${photoType}.${fileExtension}`,
      {
        type: file.type,
      }
    );

    if (photoType === 'profile') {
      setProfileSrc(renamedFile);
    } else if (photoType === 'studentID') {
      setStudentIDSrc(renamedFile);
    }
  };

  async function uploadPhoto(data) {
    if (data !== null) {
      let file = data;
      let fileName = encodeURIComponent(file.name);
      let res = await fetch(`/api/check/profile?file=${fileName}`);
      res = await res.json();

      let formData = new FormData();
      Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });
      let uploadResult = await fetch(res.url, {
        method: 'POST',
        body: formData,
      });

      return { uploadResult, fileName };
    }
  }

  const handleNext = async () => {
    if (profileSrc && studentIDSrc) {
      let profileRes = await uploadPhoto(profileSrc);
      let studentIDRes = await uploadPhoto(studentIDSrc);

      if (profileRes.uploadResult.ok && studentIDRes.uploadResult.ok) {
        let profileURL =
          profileRes.uploadResult.url + '/' + profileRes.fileName;
        let studentIDURL =
          studentIDRes.uploadResult.url + '/' + studentIDRes.fileName;
        dispatch(setGlobalProfileImg(profileURL));
        dispatch(setGlobalIDCardImg(studentIDURL));
        router.replace('/register/account');
      } else {
        alert('업로드 과정에서 에러가 발생했습니다');
      }
    } else {
      alert('프로필이나 학생증사진을 등록해주세요');
    }
  };
  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-start'>
          <span className='text-title'>본인 확인</span>
          <div className='my-[10px] opacity-70 text-subtitle'>
            <p>회원님의 얼굴이 나오는 사진과</p>
            <p>대학교 학생증 사진을 제출해주세요</p>
          </div>
        </div>

        <div className='w-full mt-[20px] flex justify-center gap-[15px]'>
          <div className='w-full flex flex-col justify-center gap-[10px]'>
            <span>프로필사진</span>
            <div
              className={`w-full flex justify-center items-center aspect-square ${profileSrc ? 'focus-btn' : 'btn'} relative`}
            >
              {profileSrc ? (
                <Image
                  className='object-contain rounded-[15px]'
                  src={profileSrc ? URL.createObjectURL(profileSrc) : ''}
                  alt='profile'
                  fill
                />
              ) : null}
              <label
                htmlFor='profile'
                className='focus-btn cursor-pointer absolute right-[10px] bottom-[10px] p-[2px] bg-white'
              >
                <Image
                  src={'/register/photo/add-photo.svg'}
                  alt='add-photo'
                  width={25}
                  height={25}
                />
              </label>
            </div>
            <input
              type='file'
              id='profile'
              accept='image/*, image/heic'
              className='hidden'
              onChange={(e) => handlePhoto(e, 'profile')}
            />
          </div>
          <div className='w-full flex flex-col justify-center gap-[10px]'>
            <span>학생증사진</span>
            <div
              className={`w-full flex justify-center items-center aspect-square ${studentIDSrc ? 'focus-btn' : 'btn'} relative`}
            >
              {studentIDSrc ? (
                <Image
                  className='object-contain rounded-[15px]'
                  src={studentIDSrc ? URL.createObjectURL(studentIDSrc) : ''}
                  alt='profile'
                  fill
                />
              ) : null}
              <label
                htmlFor='studentID'
                className='focus-btn cursor-pointer absolute right-[10px] bottom-[10px] p-[2px] bg-white'
              >
                <Image
                  src={'/register/photo/add-photo.svg'}
                  alt='add-photo'
                  width={25}
                  height={25}
                />
              </label>
            </div>
            <input
              type='file'
              id='studentID'
              accept='image/*, image/heic'
              className='hidden'
              onChange={(e) => handlePhoto(e, 'studentID')}
            />
          </div>
        </div>

        <fieldset className='text-start w-full border border-[#E8E6EA] border-solid rounded-[15px] p-[20px] mt-[20px]'>
          <legend className='px-[10px] text-main-red'>프로필사진 참고</legend>
          <div className='flex flex-col gap-[10px] text-info'>
            <p className='text-black/50'>프로필은 본인확인이 가능한 정면사진</p>
            <p className='text-black/50'>프로필 사진은 AI 변환처리 돼요</p>
            <p className='text-black/50'>등록한 사진은 공개되지 않아요</p>
          </div>
        </fieldset>

        <fieldset className='text-start w-full border border-[#E8E6EA] border-solid rounded-[15px] p-[20px] mt-[20px]'>
          <legend className='px-[10px] text-main-red'>학생증사진 참고</legend>
          <div className='flex flex-col gap-[10px] text-info'>
            <p className='text-black/50'>
              실물 학생증과 모바일 학생증만 가능해요
            </p>
            <p className='text-black/50'>이름과 얼굴 사진이 나와야 해요</p>
          </div>
        </fieldset>

        <div className='w-full'>
          <button
            // disabled={MBTI.includes('')}
            onClick={handleNext}
            className={`w-full h-[60px] my-[20px] full-btn`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPhoto;
