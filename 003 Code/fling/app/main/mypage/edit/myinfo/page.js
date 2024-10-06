'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const editMyInfo = () => {
  const [info, setInfo] = useState();
  const [defaultInfo, setDefaultInfo] = useState();
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      let myinfo = {
        univ: session.user.univ,
        department: session.user.department,
        height: session.user.height,
        religion: session.user.religion,
        mbti: session.user.mbti,
        smoking: session.user.smoking,
        drinkLimit: session.user.drinkLimit,
        army: session.user.army,
      };
      console.log(myinfo);
      setInfo(myinfo);
      setDefaultInfo(session.user);
    }
  }, [session, status]);

  const handleEditInfo = async () => {
    await axios
      .post('/api/edit/myinfo', { defaultInfo, info })
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
            isClearable
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
            classNames={{
              label: 'w-[70px]',
              innerWrapper: 'pb-0',
              mainWrapper: 'flex-1',
            }}
          />
          <Input
            label='MBTI'
            startContent={
              <div className='w-full flex gap-[5px] text-info py-[5px]'>
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
            isClearable
            type='numeric'
            variant='underlined'
            label='주량'
            step={0.5}
            onChange={(e) => {
              setInfo((prev) => ({
                ...prev,
                drinkLimit:
                  e.target.value !== '' ? parseFloat(e.target.value) : 0,
              }));
            }}
            labelPlacement='outside-left'
            value={info.drinkLimit}
            classNames={{
              label: 'w-[70px]',
              innerWrapper: 'pb-0',
              mainWrapper: 'flex-1',
            }}
          />
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
