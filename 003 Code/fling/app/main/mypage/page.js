'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styled from 'styled-components';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const MypagePage = () => {
  const { data: session, status } = useSession();
  const date = new Date();

  const [isClickModifyInfo, setIsClickModifyInfo] = useState(true);
  const [isClickModifyIntro, setIsClickModifyIntro] = useState(false);
  const [isClickModifyHobby, setIsClickModifyHobby] = useState(false);

  const [modifyInfo, setModifyInfo] = useState(null);
  // const [info, setInfo] = useState({
  //   height: 0,
  //   religion: null,
  //   mbti: [],
  //   smoking: false,
  //   drinkLimit: 0,
  // });
  // const [modifyHeight, setModifyHeight] = useState();
  // const [modifyReligion, setModifyReligion] = useState()
  // const [modifyMBTI, setModifyMBTI] = useState()
  // const [modifySmoking, setModifySmoking] = useState()
  // const [modifyDrinkLimit, setModifyDrinkLimit] = useState()

  const modalRef = useRef();

  useOnClickOutside(modalRef, () => {
    setIsClickModifyInfo(false);
    setIsClickModifyIntro(false);
    setIsClickModifyHobby(false);
  });

  if (status === 'authenticated') {
    console.log(session);
    // setModifyInfo({
    //   drinkLimit: session.user.drinkLimit,
    //   height: session.user.height,
    //   hobby: session.user.hobby,
    //   introduction: session.user.introduction,
    //   mbti: session.user.mbti,
    //   religion: '',
    //   smoking: session.user.smoking,
    // });
  }

  const handleMyInfo = (e) => {
    e.preventDefault();
  };

  const handleMyIntroduction = () => {};
  const handleMyHobby = () => {};

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

  useEffect(() => {
    if (isClickModifyHobby || isClickModifyInfo || isClickModifyIntro) {
      document.querySelector('.main').classList.add('overflow-y-hidden');
    } else {
      document.querySelector('.main').classList.remove('overflow-y-hidden');
    }
  }, [isClickModifyHobby, isClickModifyInfo, isClickModifyIntro]);

  return (
    <div className='w-full h-fit bg-gray-100 px-[40px]'>
      {(isClickModifyHobby || isClickModifyInfo || isClickModifyIntro) && (
        <Modal className='bg-black/20 absolute w-full max-w-[440px] min-w-[330px] h-full top-0 left-0 z-[99999]'>
          <div
            ref={modalRef}
            className='w-[92%] h-full max-h-[450px] flex flex-col bg-white rounded-[15px] absolute top-1/2 left-1/2 transform translate-x-1/2 translate-y-1/2'
          >
            {isClickModifyInfo && (
              <div className='size-full flex flex-col p-[20px] gap-[20px]'>
                <span>나의 정보</span>
                <form
                  id='modify-info-form'
                  onSubmit={handleMyInfo}
                  className='w-full flex flex-col flex-1 gap-[10px] py-[10px] overflow-y-scroll relative'
                >
                  {infoComponent('학교', <span>{session?.user.univ}</span>)}
                  {infoComponent(
                    '학과',
                    <span>{session?.user.department}</span>
                  )}
                  {infoComponent(
                    '키',
                    <input
                      className='text-main-red'
                      value={session?.user.height}
                      type='numeric'
                      // onChange={(e) =>
                      //   setModifyInfo((state) => {
                      //     state.height = e.target.value;
                      //   })
                      // }
                    />
                  )}
                  {infoComponent(
                    '종교',
                    <div className='flex gap-[5px]'>
                      <button className={`flex-1 px-[5px] focus-btn`}>
                        기독교
                      </button>
                      <button className={`flex-1 px-[5px] focus-btn`}>
                        불교
                      </button>
                      <button className={`flex-1 px-[5px] focus-btn`}>
                        무교
                      </button>
                      <button className={`flex-1 px-[5px] focus-btn`}>
                        없음
                      </button>
                    </div>
                  )}
                  {infoComponent(
                    'MBTI',
                    <div className='w-full flex gap-[5px]'>
                      <div className='flex flex-1 flex-col gap-[5px]'>
                        <button>I</button>
                        <button>E</button>
                      </div>
                      <div className='flex flex-1 flex-col gap-[5px]'>
                        <button>N</button>
                        <button>S</button>
                      </div>
                      <div className='flex flex-1 flex-col gap-[5px]'>
                        <button>F</button>
                        <button>T</button>
                      </div>
                      <div className='flex flex-1 flex-col gap-[5px]'>
                        <button>P</button>
                        <button
                        // className={`aspect-square ${session?.user.mbti[3] === 'J' ? 'full-btn' : 'focus-btn'}`}
                        >
                          J
                        </button>
                      </div>
                    </div>
                  )}
                  {infoComponent(
                    '흡연여부',
                    <div className='flex gap-[5px]'>
                      <button className='flex-1 px-[5px] focus-btn'>
                        비흡연자
                      </button>
                      <button className='flex-1 px-[5px] focus-btn'>
                        흡연자
                      </button>
                    </div>
                  )}
                  {infoComponent('주량', <span>2병</span>)}
                  {infoComponent(
                    '군필여부',
                    <span>{session?.user.army ? '군필자' : '미필자'}</span>
                  )}
                </form>
                <button
                  form='modify-info-form'
                  type='submit'
                  className='w-full h-[40px] full-btn'
                >
                  수정하기
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
      <div className='size-full flex flex-col gap-[20px] items-center pt-[270px]'>
        <div className='absolute top-[60px] w-full bg-white flex flex-col gap-[10px] px-[40px] py-[20px]'>
          <div className='w-full flex gap-[20px]'>
            <div className='size-[100px] bg-black text-white rounded-full'>
              이미지
            </div>
            <div className='text-start'>
              <div className='flex gap-[5px]'>
                <span>{session?.user.nickname}님</span>
                <span>
                  , {date.getFullYear() - session?.user.birth.year + 1}살
                </span>
              </div>
              <div className='flex gap-[5px] text-info'>
                <span>{session?.user.univ}</span>
                <span></span>
                <span>{session?.user.department}</span>
              </div>
            </div>
          </div>
          <div className='w-full h-[40px] flex flex-col gap-[10px]'>
            <div className='size-full flex gap-[10px] justify-center items-center'>
              <Image
                src={`/main/mypage/check-${session?.user.univCert.toString()}.svg`}
                width={25}
                height={25}
                alt={`check-${session?.user.univCert.toString()}`}
              />
              <span
                className={
                  session?.user.univCert ? 'text-[#4ECB71]' : 'text-main-red'
                }
              >
                {session?.user.univCert ? '대학인증 완료' : '대학인증 미완료'}
              </span>
            </div>
            {/* {session?.user.univCert ? null : (
              <button className='w-full h-[60px] full-btn'>대학인증하기</button>
            )} */}
          </div>
        </div>

        <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px]'>
          <div className='w-full flex justify-between items-center'>
            <span>나의 정보</span>
            <button
              className='flex gap-[5px] px-[10px] py-[5px] justify-center items-center border border-solid border-gray-200 rounded-full'
              onClick={() => setIsClickModifyInfo(true)}
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
            {infoComponent('학교', session?.user.univ)}
            {infoComponent('학과', session?.user.department)}
            {infoComponent('키', `${session?.user.height}cm`)}
            {/* {info('스타일', '끈기있는, 섬세한, 창의적인')} */}
            {infoComponent('종교', '무교')}
            {infoComponent('MBTI', session?.user.mbti.join(''))}
            {infoComponent(
              '흡연/음주',
              `${session?.user.smoking === 'smoking' ? '흡연자' : '비흡연자'} / ${session?.user.drinkLimit === 0 ? '술을 못하는 편' : `${session?.user.drinkLimit}병 정도`}`
            )}
            {infoComponent(
              '군필여부',
              `${session?.user.army ? '군필자' : '미필자'}`
            )}
          </div>
        </div>

        <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px]'>
          <div className='w-full flex justify-between items-center'>
            <span>한 줄 소개</span>
            <button
              className='flex gap-[5px] px-[10px] py-[5px] justify-center items-center border border-solid border-gray-200 rounded-full'
              onClick={() => setIsClickModifyIntro(true)}
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
          <span className='text-subtitle text-start'>안녕하세요</span>
        </div>

        <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px]'>
          <div className='w-full flex justify-between items-center'>
            <span>연애 유형</span>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <span className='text-subtitle text-start'>
              {session?.user.datingType.type}
            </span>
            <span className='text-info text-start'>
              {session?.user.datingType.description}
            </span>
          </div>
        </div>

        <div className='w-full bg-white flex flex-col gap-[20px] p-[20px] rounded-[15px]'>
          <div className='w-full flex justify-between items-center'>
            <span>취미</span>
            <button
              className='flex gap-[5px] px-[10px] py-[5px] justify-center items-center border border-solid border-gray-200 rounded-full'
              onClick={() => setIsClickModifyHobby(true)}
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
            {session?.user.hobby.map((element) => element[0])}
          </span>
        </div>

        <div className='w-full h-[100px]'></div>
      </div>
    </div>
  );
};

export default MypagePage;

const Modal = styled.div``;
