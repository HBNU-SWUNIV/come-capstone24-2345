'use client';

// import { setGlobalIntroduction } from '../../../library/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@nextui-org/react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { setStoreIntroduction } from '../../../library/store';

const RegisterIntroduction = () => {
  const [introduction, setIntroduction] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const userIntroduction = useSelector(
    (state) => state.registerUserInfo.introduction
  );

  useEffect(() => {
    if (userIntroduction) {
      router.replace('/register/success');
    }
  }, [userIntroduction]);

  const handleNext = () => {
    if (introduction !== '') {
      setIsLoading(true);
      dispatch(setStoreIntroduction(introduction));
    } else {
      alert('한 줄 소개를 작성해주세요');
    }
  };

  return (
    <div className='w-full h-dvh px-[40px] pt-[80px] pb-[120px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='text-start w-3/5 flex flex-col gap-[10px]'>
          <p className='text-title text-main-red'>한 줄 소개</p>
          <p className='text-subtitle break-keep text-gray-500'>
            회원님을 한 줄로 표현해주세요
          </p>
        </div>
        <Input
          variant='bordered'
          isRequired
          label='한 줄 소개'
          value={introduction}
          onValueChange={setIntroduction}
          classNames={{
            inputWrapper: 'border border-solid border-slate-200',
          }}
        />

        <Accordion isCompact className='px-0'>
          <AccordionItem
            key='1'
            aria-label='introduction tips'
            title='간단한 자기소개 작성 Tip'
            classNames={{
              title: '!text-subtitle px-[10px]',
              content:
                'bg-white text-info text-start p-[20px] rounded-[15px] card-border',
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
          onClick={handleNext}
          disabled={introduction === ''}
          className={`absolute bottom-[-80px] w-full left-0 ${introduction === '' ? 'btn' : 'full-btn'} h-[50px] content-center`}
        >
          {isLoading ? '확인중...' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default RegisterIntroduction;
