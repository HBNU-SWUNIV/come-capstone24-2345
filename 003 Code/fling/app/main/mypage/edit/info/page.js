'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Input, Slider } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const editMyInfo = () => {
  const [info, setInfo] = useState();
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      setInfo(session.user);
    }
  }, [session, status]);

  const handleEditInfo = async () => {
    if (info.height < 100 || info.height > 250) {
      alert('회원님의 키를 잘못 입력하셨습니다');
      return;
    }
    await axios
      .post('/api/edit/info', { info })
      .then((res) => {
        update(res.data);
        alert('수정되었습니다!');
        router.replace('/main/mypage');
      })
      .catch((err) => {
        alert(err.response.data);
        router.replace('/main/mypage');
      });
  };

  if (info) {
    return (
      <div className='w-full h-dvh bg-gray-50 pt-[80px] pb-[100px] px-[40px] text-start flex flex-col gap-[20px] overflow-y-scroll'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-[10px] items-end'>
            <span>나의 정보</span>
            <span className='text-info text-gray-500'>(* 표시는 수정불가)</span>
          </div>
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
            isRequired
            variant='underlined'
            label='학교'
            labelPlacement='outside-left'
            value={info.univ}
            classNames={{
              label: 'w-[70px]',
              innerWrapper: 'pb-0',
              mainWrapper: 'flex-1',
            }}
            disabled
          />
          <Input
            isRequired
            variant='underlined'
            label='학과'
            labelPlacement='outside-left'
            value={info.department}
            classNames={{
              label: 'w-[70px]',
              innerWrapper: 'pb-0',
              mainWrapper: 'flex-1',
            }}
            disabled
          />
          <Input
            label='종교'
            startContent={
              <div className='w-full flex gap-[5px] text-info justify-between px-[5px]'>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      religion: '기독교',
                    }))
                  }
                  className={`flex-1 py-[5px] ${info.religion === '기독교' ? 'focus-btn' : 'btn'}`}
                >
                  기독교
                </button>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      religion: '불교',
                    }))
                  }
                  className={`flex-1 py-[5px] ${info.religion === '불교' ? 'focus-btn' : 'btn'}`}
                >
                  불교
                </button>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      religion: '없음',
                    }))
                  }
                  className={`flex-1 py-[5px] ${info.religion === '없음' ? 'focus-btn' : 'btn'}`}
                >
                  없음
                </button>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      religion: '기타',
                    }))
                  }
                  className={`flex-1 py-[5px] ${info.religion === '기타' ? 'focus-btn' : 'btn'}`}
                >
                  기타
                </button>
              </div>
            }
            labelPlacement='outside-left'
            classNames={{
              input: 'hidden',
              inputWrapper:
                'bg-transparent shadow-none px-0 data-[hover=true]:bg-transparent',
              label: 'w-[70px]',
              innerWrapper: 'pb-0',
              mainWrapper: 'flex-1',
            }}
          />
          <Input
            type='numeric'
            variant='underlined'
            label='키'
            maxLength={3}
            onChange={(e) =>
              setInfo((prev) => ({
                ...prev,
                height: e.target.value !== '' ? parseInt(e.target.value) : 0,
              }))
            }
            labelPlacement='outside-left'
            value={info.height}
            endContent={
              <div className='pointer-events-none flex items-center'>
                <span className='text-info'>cm</span>
              </div>
            }
            classNames={{
              label: 'w-[70px]',
              innerWrapper: 'pb-0',
              mainWrapper: 'flex-1',
            }}
          />

          <div className='w-full flex items-center'>
            <span className='text-z-10 pointer-events-none origin-top-left rtl:origin-top-right subpixel-antialiased block text-small group-data-[filled-within=true]:text-foreground relative text-foreground pr-2 rtl:pr-0 rtl:pl-2 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[has-helper=true]:pt-3 w-[70px]'>
              MBTI
            </span>
            <div className='w-full flex-1 flex gap-[10px] justify-around text-info py-[5px]'>
              <div className='flex flex-1 flex-col gap-[10px]'>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      mbti: { type: ['I', ...prev.mbti.type.slice(1)] },
                    }))
                  }
                  className={`aspect-square ${
                    info.mbti.type[0] === 'I' ? 'focus-btn' : 'btn'
                  }`}
                >
                  I
                </button>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      mbti: { type: ['E', ...prev.mbti.type.slice(1)] },
                    }))
                  }
                  className={`aspect-square ${
                    info.mbti.type[0] === 'E' ? 'focus-btn' : 'btn'
                  }`}
                >
                  E
                </button>
              </div>
              <div className='flex flex-1 flex-col gap-[10px]'>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      mbti: {
                        type: [
                          prev.mbti.type[0],
                          'N',
                          ...prev.mbti.type.slice(2),
                        ],
                      },
                    }))
                  }
                  className={`aspect-square ${
                    info.mbti.type[1] === 'N' ? 'focus-btn' : 'btn'
                  }`}
                >
                  N
                </button>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      mbti: {
                        type: [
                          prev.mbti.type[0],
                          'S',
                          ...prev.mbti.type.slice(2),
                        ],
                      },
                    }))
                  }
                  className={`aspect-square ${
                    info.mbti.type[1] === 'S' ? 'focus-btn' : 'btn'
                  }`}
                >
                  S
                </button>
              </div>
              <div className='flex flex-1 flex-col gap-[10px]'>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      mbti: {
                        type: [
                          ...prev.mbti.type.slice(0, 2),
                          'F',
                          prev.mbti.type[3],
                        ],
                      },
                    }))
                  }
                  className={`aspect-square ${
                    info.mbti.type[2] === 'F' ? 'focus-btn' : 'btn'
                  }`}
                >
                  F
                </button>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      mbti: {
                        type: [
                          ...prev.mbti.type.slice(0, 2),
                          'T',
                          prev.mbti.type[3],
                        ],
                      },
                    }))
                  }
                  className={`aspect-square ${
                    info.mbti.type[2] === 'T' ? 'focus-btn' : 'btn'
                  }`}
                >
                  T
                </button>
              </div>
              <div className='flex flex-1 flex-col gap-[10px]'>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      mbti: { type: [...prev.mbti.type.slice(0, 3), 'P'] },
                    }))
                  }
                  className={`aspect-square ${
                    info.mbti.type[3] === 'P' ? 'focus-btn' : 'btn'
                  }`}
                >
                  P
                </button>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      mbti: { type: [...prev.mbti.type.slice(0, 3), 'J'] },
                    }))
                  }
                  className={`aspect-square ${
                    info.mbti.type[3] === 'J' ? 'focus-btn' : 'btn'
                  }`}
                >
                  J
                </button>
              </div>
            </div>
          </div>

          <div className='w-full px-[10px]'>
            <Slider
              label='주량'
              size='sm'
              color='danger'
              minValue={0}
              maxValue={7}
              getValue={(value) => (value >= 7 ? `7병 이상` : `${value}병`)}
              step={0.5}
              marks={[
                {
                  value: 0,
                  label: 'X',
                },
                {
                  value: 2,
                  label: '조금마심',
                },
                {
                  value: 5,
                  label: '술고래',
                },
              ]}
              onChange={(value) => {
                setInfo((prev) => ({
                  ...prev,
                  drinkLimit: value,
                }));
              }}
              value={info.drinkLimit}
              className='max-w-md'
              classNames={{
                mark: 'text-info text-gray-300',
              }}
            />
          </div>

          <Input
            isRequired
            variant='underlined'
            label='군필여부'
            labelPlacement='outside-left'
            value={info.army ? '군필' : '미필'}
            classNames={{
              label: 'w-[70px]',
              innerWrapper: 'pb-0',
              mainWrapper: 'flex-1',
            }}
            disabled
          />
          <Input
            // variant='underlined'
            label='흡연여부'
            startContent={
              <div className='w-full flex gap-[5px] text-info justify-around px-[5px]'>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      smoking: true,
                    }))
                  }
                  className={`flex-1 py-[5px] ${info.smoking ? 'focus-btn' : 'btn'}`}
                >
                  흡연자
                </button>
                <button
                  onClick={() =>
                    setInfo((prev) => ({
                      ...prev,
                      smoking: false,
                    }))
                  }
                  className={`flex-1 py-[5px] ${!info.smoking ? 'focus-btn' : 'btn'}`}
                >
                  비흡연자
                </button>
              </div>
            }
            labelPlacement='outside-left'
            classNames={{
              input: 'hidden',
              inputWrapper:
                'bg-transparent shadow-none px-0 data-[hover=true]:bg-transparent',
              label: 'w-[70px]',
              innerWrapper: 'pb-0',
              mainWrapper: 'flex-1',
            }}
          />
        </div>
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

export default editMyInfo;
