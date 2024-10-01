'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Accordion, AccordionItem } from '@nextui-org/react';
import Image from 'next/image';

const editMyIntro = () => {
  const [info, setInfo] = useState();
  const [defaultInfo, setDefaultInfo] = useState();
  const [isAccordionClick, setIsAccordionClick] = useState(false);
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      let myinfo = {
        univ: session.user.univ,
        department: session.user.department,
        introduction: session.user.introduction,
      };
      setInfo(myinfo);
      setDefaultInfo(session.user);
    }
  }, [session, status]);

  useEffect(() => {
    console.log(info);
  }, [info]);

  const handleEditInfo = async () => {
    await axios
      .post('/api/edit/myintro', { defaultInfo, info })
      .then((res) => {
        alert('수정되었습니다!');
        update({ ...res.data.defaultInfo, ...res.data.modifyInfo });
        router.replace('/main/mypage');
      })
      .catch((err) => {
        alert(err.response.data);
        router.replace('/main/mypage');
      });
  };

  if (info) {
    return (
      <div className='w-full h-[calc(100vh_+_60px)] bg-gray-50 py-[80px] px-[40px] text-start flex flex-col gap-[20px] overflow-y-scroll'>
        <div className='flex justify-between items-center'>
          <span>나의 한 줄 소개</span>
          <Image
            src='/main/mypage/close.svg'
            width={25}
            height={25}
            alt='close'
            className='cursor-pointer'
            onClick={() => {
              router.replace('/main/mypage/');
            }}
          />
        </div>
        <div className='w-full flex flex-col bg-white items-center justify-between gap-[5px] px-[20px] py-[10px] rounded-[15px] card-border'>
          <Input
            isClearable
            variant='underlined'
            label='한 줄로 자신을 표현해 주세요'
            labelPlacement='inside'
            defaultValue={info.introduction}
            classNames={{
              inputWrapper: '!p-0',
            }}
            onChange={(e) => {
              setInfo((prev) => ({ ...prev, introduction: e.target.value }));
            }}
          />
        </div>
        <Accordion
          isCompact
          className='px-0'
          onClick={() => setIsAccordionClick((prev) => !prev)}
        >
          <AccordionItem
            key='1'
            aria-label='introduction tips'
            title='간단한 자기소개 작성 Tip'
            classNames={{
              title: '!text-subtitle px-[10px]',
              content: 'bg-white text-info p-[20px] rounded-[15px] card-border',
            }}
          >
            <div className='flex flex-col gap-[15px]'>
              <div className='flex flex-col gap-[5px]'>
                <p>취미를 강조해보세요</p>
                <p className='text-info opacity-70 ml-[10px]'>
                  "커피 마시며 독서하는 시간을 좋아하는 감성러입니다☕📚"
                </p>
              </div>
              <div className='flex flex-col gap-[5px]'>
                <p>유머 감각을 보여주세요</p>
                <p className='text-info opacity-70 ml-[10px]'>
                  "나무를 좋아하는 사람? 저랑 대화해요, 식물과 대화하는 건 아직
                  익숙하지 않거든요🌿😅"
                </p>
              </div>
              <div className='flex flex-col gap-[5px]'>
                <p>특별한 경험이나 목표를 공유해보세요</p>
                <p className='text-info opacity-70 ml-[10px]'>
                  "요리 배우고 있는데 저의 요리를 맛봐줄 분을 찾고 있어요👨‍🍳"
                </p>
              </div>
              <div className='flex flex-col gap-[5px]'>
                <p>성격과 가치관을 드러내보세요</p>
                <p className='text-info opacity-70 ml-[10px]'>
                  "같이 성장할 수 있는 사람을 찾고 있어요🌱"
                </p>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
        <button
          onClick={handleEditInfo}
          className='full-btn w-full px-[20px] py-[10px]'
        >
          수정하기
        </button>
      </div>
    );
  }
};

export default editMyIntro;
