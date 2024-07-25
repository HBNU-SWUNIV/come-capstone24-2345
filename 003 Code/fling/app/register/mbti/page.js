'use client';

import { setGlobalMbti } from '@/library/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterMBTI = () => {
  let [mbti, setMbti] = useState(['', '', '', '']);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/check/mbti', { mbti })
      .then((result) => {
        dispatch(setGlobalMbti(result.data));
        router.push('/register/hobby');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  useEffect(() => {
    console.log(mbti);
  }, [mbti]);

  const handleIE = (e) => {
    if (e.target.dataset.mbti) {
      let copy = [...mbti];
      copy[0] = e.target.dataset.mbti;
      setMbti(copy);
    }
  };
  const handleNS = (e) => {
    if (e.target.dataset.mbti) {
      let copy = [...mbti];
      copy[1] = e.target.dataset.mbti;
      setMbti(copy);
    }
  };
  const handleFT = (e) => {
    if (e.target.dataset.mbti) {
      let copy = [...mbti];
      copy[2] = e.target.dataset.mbti;
      setMbti(copy);
    }
  };
  const handlePJ = (e) => {
    if (e.target.dataset.mbti) {
      let copy = [...mbti];
      copy[3] = e.target.dataset.mbti;
      setMbti(copy);
    }
  };

  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={50}
        min={0}
        max={100}
      ></progress>

      <form
        className='size-full flex flex-col'
        onSubmit={handleSubmit}
        method='POST'
      >
        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          회원님의 MBTI를 선택해 주세요
        </span>

        <div
          className='flex justify-evenly w-full mb-[20px]'
          onClick={handleIE}
        >
          <div className='w-2/5 flex flex-col items-center'>
            <img
              className={`w-3/5 p-[25px] mb-[20px] aspect-square rounded-[20px] cursor-pointer ${mbti[0] == 'I' ? 'btn' : 'card'}`}
              data-mbti='I'
              src='/mbti/I.svg'
            />
            <p>내향형</p>
            <p style={{ fontSize: '12px' }}>깊이있는 대인관계 유지</p>
          </div>
          <div className='w-2/5 flex flex-col items-center'>
            <img
              className={`w-3/5 p-[25px] mb-[20px] aspect-square rounded-[20px] cursor-pointer ${mbti[0] == 'E' ? 'btn' : 'card'}`}
              data-mbti='E'
              src='/mbti/E.svg'
            />
            <p>외향형</p>
            <p style={{ fontSize: '12px' }}>폭넓은 대인관계 유지</p>
          </div>
        </div>

        <div
          className='flex justify-evenly w-full mb-[20px]'
          onClick={handleNS}
        >
          <div className='w-2/5 flex flex-col items-center'>
            <img
              className={`w-3/5 p-[25px] mb-[20px] aspect-square rounded-[20px] cursor-pointer ${mbti[1] == 'N' ? 'btn' : 'card'}`}
              data-mbti='N'
              src='/mbti/N.svg'
            />
            <p>직관형</p>
            <p style={{ fontSize: '12px' }}>현재지향적</p>
          </div>
          <div className='w-2/5 flex flex-col items-center'>
            <img
              className={`w-3/5 p-[25px] mb-[20px] aspect-square rounded-[20px] cursor-pointer ${mbti[1] == 'S' ? 'btn' : 'card'}`}
              data-mbti='S'
              src='/mbti/S.svg'
            />
            <p>감각형</p>
            <p style={{ fontSize: '12px' }}>미래지향적</p>
          </div>
        </div>

        <div
          className='flex justify-evenly w-full mb-[20px]'
          onClick={handleFT}
        >
          <div className='w-2/5 flex flex-col items-center'>
            <img
              className={`w-3/5 p-[25px] mb-[20px] aspect-square rounded-[20px] cursor-pointer ${mbti[2] == 'F' ? 'btn' : 'card'}`}
              data-mbti='F'
              src='/mbti/F.svg'
            />
            <p>감정형</p>
            <p style={{ fontSize: '12px' }}>사람, 관계에 관심</p>
          </div>
          <div className='w-2/5 flex flex-col items-center'>
            <img
              className={`w-3/5 p-[25px] mb-[20px] aspect-square rounded-[20px] cursor-pointer ${mbti[2] == 'T' ? 'btn' : 'card'}`}
              data-mbti='T'
              src='/mbti/T.svg'
            />
            <p>사고형</p>
            <p style={{ fontSize: '12px' }}>진실, 사실에 관심</p>
          </div>
        </div>

        <div
          className='flex justify-evenly w-full mb-[20px]'
          onClick={handlePJ}
        >
          <div className='w-2/5 flex flex-col items-center'>
            <img
              className={`w-3/5 p-[25px] mb-[20px] aspect-square rounded-[20px] cursor-pointer ${mbti[3] == 'P' ? 'btn' : 'card'}`}
              data-mbti='P'
              src='/mbti/P.svg'
            />
            <p>인식형</p>
            <p style={{ fontSize: '12px' }}>목적과 방향은 변화 가능</p>
          </div>
          <div className='w-2/5 flex flex-col items-center'>
            <img
              className={`w-3/5 p-[25px] mb-[20px] aspect-square rounded-[20px] cursor-pointer ${mbti[3] == 'J' ? 'btn' : 'card'}`}
              data-mbti='J'
              src='/mbti/J.svg'
            />
            <p>판단형</p>
            <p style={{ fontSize: '12px' }}>분명한 목적과 방향</p>
          </div>
        </div>

        <button type='submit' className='btn p-[20px] mb-[40px] rounded-full'>
          다음
        </button>
      </form>
    </>
  );
};

export default RegisterMBTI;
