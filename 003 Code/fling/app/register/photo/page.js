'use client';

import { setGlobalIDCardImg, setGlobalProfileImg } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const RegisterPhoto = () => {
  let [profileSrc, setProfileSrc] = useState(null);
  let [studentIDSrc, setStudentIDSrc] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const globalUserInfo = useSelector((state) => state.registerUserInfo);

  useEffect(() => {
    if (globalUserInfo.profileImg != '' && globalUserInfo.IDCardImg != '') {
      router.replace('/register/introduction');
    }
  }, [globalUserInfo]);

  const checkPhoto = async (e) => {
    e.preventDefault();

    if (profileSrc) {
      let file = profileSrc;
      let filename = encodeURIComponent(file.name);
      let res = await fetch('/api/check/profile?file=' + filename);
      res = await res.json();

      console.log(res);
      //S3 업로드
      const formData = new FormData();
      Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });
      let uploadResult = await fetch(res.url, {
        method: 'POST',
        body: formData,
      });
      console.log(uploadResult);

      if (uploadResult.ok) {
        dispatch(setGlobalProfileImg(uploadResult.url + '/' + filename));
      } else {
        console.log('실패');
      }
    }

    if (studentIDSrc) {
      let file = studentIDSrc;
      let filename = encodeURIComponent(file.name);
      let res = await fetch('/api/check/profile?file=' + filename);
      res = await res.json();

      //S3 업로드
      const formData = new FormData();
      Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });
      let uploadResult = await fetch(res.url, {
        method: 'POST',
        body: formData,
      });
      console.log(uploadResult);

      if (uploadResult.ok) {
        dispatch(setGlobalIDCardImg(uploadResult.url + '/' + filename));
      } else {
        console.log('실패');
      }
    }
    // };
    if (profileSrc == null || studentIDSrc == null) {
      alert('프로필과 학생증 사진을 올려주세요');
    }
  };

  const handleProfile = async (e) => {
    let file = e.target.files[0];
    let arr = file.name.split('.');
    let extension = arr[arr.length - 1];

    let renamedFile = new File(
      [file],
      `${globalUserInfo.email}_profile.${extension}`,
      {
        type: file.type,
      }
    );
    setProfileSrc(renamedFile);
  };

  const handleStudentID = async (e) => {
    let file = e.target.files[0];
    let arr = file.name.split('.');
    let extension = arr[arr.length - 1];

    let renamedFile = new File(
      [file],
      `${globalUserInfo.email}_studentID.${extension}`,
      {
        type: file.type,
      }
    );
    setStudentIDSrc(renamedFile);
  };
  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={90}
        min={0}
        max={100}
      ></progress>
      <div className='size-full flex flex-col'>
        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          회원님의 본인확인
        </span>

        <form onSubmit={checkPhoto} method='POST'>
          <div className='flex justify-between mb-[20px]'>
            <div className='w-[46%]'>
              <span style={{ fontSize: '18px' }}>프로필 사진</span>
              <label htmlFor='profile'>
                <div className='w-full aspect-square p-[20px] flex justify-center items-center my-[20px] card rounded-[20px] text-5xl cursor-pointer'>
                  {profileSrc ? (
                    <img
                      className='w-full aspect-square object-contain'
                      src={profileSrc ? URL.createObjectURL(profileSrc) : ''}
                    />
                  ) : (
                    '+'
                  )}
                </div>
                <input
                  type='file'
                  id='profile'
                  accept='image/*'
                  onChange={handleProfile}
                  className='hidden'
                />
              </label>

              <div
                className='flex flex-col text-start pl-[8px] opacity-60'
                style={{ fontSize: '12px' }}
              >
                <span className='mb-[8px]'>본인확인이 가능한 정면사진</span>
                <span className='mb-[8px]'>사진은 변환 처리됨</span>
                <span>본 사진은 공개되지 않음</span>
              </div>
            </div>
            <div className='w-[46%]'>
              <span style={{ fontSize: '18px' }}>학생증 사진</span>
              <label htmlFor='studentID'>
                <div className='w-full aspect-square p-[20px] flex justify-center items-center my-[20px] card rounded-[20px] text-5xl cursor-pointer'>
                  {studentIDSrc ? (
                    <img
                      className='w-full aspect-square object-contain'
                      src={
                        studentIDSrc ? URL.createObjectURL(studentIDSrc) : ''
                      }
                    />
                  ) : (
                    '+'
                  )}
                </div>
                <input
                  type='file'
                  id='studentID'
                  accept='image/*'
                  onChange={handleStudentID}
                  className='hidden'
                />
              </label>
              <div
                className='flex flex-col text-start pl-[8px] opacity-60'
                style={{ fontSize: '12px' }}
              >
                <span className='mb-[8px]'>모바일, 실물 학생증만 가능</span>
                <span>이름과 본인사진을 포함해야 함</span>
              </div>
            </div>
          </div>

          <p
            className='mb-[20px] text-[var(--main-puple)]'
            style={{ fontSize: '14px' }}
          >
            대학 인증 심사기간은 며칠이 소요될 수 있습니다
          </p>
          <button
            className='w-full btn p-[20px] mb-[20px] rounded-full'
            type='submit'
          >
            제출하기
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPhoto;
