'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterPhoto = () => {
  let [profileSrc, setProfileSrc] = useState(true); // null로 수정할 것
  let [studentIDSrc, setStudentIDSrc] = useState(true); // null로 수정할 것

  const router = useRouter();

  const checkPhoto = (e) => {
    e.preventDefault();
    if (profileSrc && studentIDSrc) {
      router.push('/register/success');
    }
  };

  const handleProfile = async (e) => {
    let imgFile = e.target.files[0];
    let imgFileName = encodeURIComponent(imgFile.name);
    await axios
      .post('/api/check/profile', { imgFileName })
      .then((result) => {
        setProfileSrc(result.data.imgFileName);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handleStudentID = async (e) => {
    let imgFile = e.target.files[0];
    let imgFileName = encodeURIComponent(imgFile.name);
    await axios
      .post('/api/check/studentID', { imgFileName })
      .then((result) => {
        setStudentIDSrc(result.data.imgFileName);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={85}
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
                <div className='w-full flex justify-center items-center my-[20px] card aspect-square rounded-[20px] text-5xl cursor-pointer'>
                  +
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
                <div className='w-full flex justify-center items-center my-[20px] card aspect-square rounded-[20px] text-5xl cursor-pointer'>
                  +
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
          <button className='w-full btn p-[20px] mb-[20px]' type='submit'>
            제출하기
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPhoto;
