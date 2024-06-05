'use client';

import { setGlobalHobby } from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterHobby = () => {
  let hobbyList = [
    '🏊🏻 수영',
    '🏄🏻‍♂️ 서핑',
    '🎱 당구',
    '🏓 탁구',
    '🏀 농구',
    '💪🏻 헬스',
    '🎮 게임',
    '🏂 보드',
    '⛷️ 스키',
    '⚽️ 축구',
    '⚾️ 야구',
    '🎾 테니스',
    '🎳 볼링',
    '🎤 노래',
    '🧗🏻 클라이밍',
    '🥊 복싱',
    '🚴🏻 사이클',
    '🎨 미술',
    '🏸 배드민턴',
    '🎣 낚시',
    '🥋 태권도/유도/주짓수',
    '📚 독서',
    '💐 원예',
    '🏕️ 캠핑',
  ];
  let [hobby, setHobby] = useState([]);
  let [etcHobby, setEtcHobby] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sendData = etcHobby ? { hobby: [...hobby, ...etcHobby] } : { hobby };
    await axios
      .post('/api/check/hobby', sendData)
      .then((result) => {
        dispatch(setGlobalHobby(result.data.hobby));
        router.push('/register/datingType');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handleClickHobby = (e) => {
    console.log(e.target.dataset.hobby);
    let copy = [...hobby];
    if (copy.includes(e.target.dataset.hobby)) {
      e.target.classList.remove('btn');
      e.target.classList.add('card');
      let filteredCopy = copy.filter(
        (element) => element != e.target.dataset.hobby
      );
      setHobby(filteredCopy);
    } else {
      e.target.classList.remove('card');
      e.target.classList.add('btn');
      copy.push(e.target.dataset.hobby);
      setHobby(copy);
    }
  };

  const handleEtcHobby = (e) => {
    if (e.target.value != '') {
      let etc = e.target.value.split(' ').join('').split(',');
      setEtcHobby(etc);
    }
  };
  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={60}
        min={0}
        max={100}
      ></progress>

      <form
        className='size-full flex flex-col'
        onSubmit={handleSubmit}
        method='POST'
      >
        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          회원님의 취미를 선택해 주세요
        </span>

        <div className='w-full flex justify-center flex-wrap mb-[20px]'>
          {hobbyList.map((element) => {
            return (
              <span
                key={element}
                onClick={handleClickHobby}
                className='m-[8px] py-[10px] px-[20px] card rounded-full cursor-pointer'
                data-hobby={element}
              >
                {element}
              </span>
            );
          })}
        </div>

        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          이외의 취미가 있다면 적어주세요
        </span>

        <input
          onChange={handleEtcHobby}
          className='w-full card p-[20px] mb-[20px] rounded-[20px]'
          placeholder='축구, 게임, ...'
        />

        <button type='submit' className='btn p-[20px] rounded-full mb-[40px]'>
          다음
        </button>
      </form>
    </>
  );
};

export default RegisterHobby;
