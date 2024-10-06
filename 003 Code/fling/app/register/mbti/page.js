'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreMbti } from '../../../library/store';

const RegisterMBTI = () => {
  const [MBTI, setMBTI] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const MBTIType = {
    ISTJ: '신뢰할 수 있고 책임감이 강한 사람',
    ISFJ: '진실되고 헌신적인 사람',
    INFJ: '복잡한 내적 생각과 감정의 세계를 가지고 있는 사람',
    INTJ: '깊은 통찰력과 전략적 사고 능력을 갖추고 있는 사람',
    ISTP: '현실적이며, 분석적으로 접근하는 사람',
    ISFP: '삶의 순간들을 소중하게 여기며, 현실적이면서도 주변 환경과 조화를 이루려고 노력하는 사람',
    INFP: '이상주의적이며, 깊은 가치관과 성실성을 가지고 있는 사람',
    INTP: '본질적으로 분석가이며, 끊임없이 새로운 아이디어와 이론을 탐색하는 사람',
    ESTP: '현재 순간을 즐기고, 실제 경험을 중시하는 사람',
    ESFP: '현재 순간을 즐기며, 주변 환경과 사람들에게 열린 사람',
    ENFP: '열정적이며 창의적이고, 가능성을 탐구하는 데 큰 흥미를 갖는 사람',
    ENTP: '창의적이고 지적 호기심이 많은 사람',
    ESTJ: '실질적이고 조직적인 성격을 가진 사람',
    ESFJ: '협조적이고 따뜻하며, 타인의 느낌과 필요에 민감하게 반응하는 사람',
    ENFJ: '따뜻하고 통찰력 있으며, 타인의 감정과 필요에 깊게 공감하는 사람',
    ENTJ: '리더십이 뛰어나고 계획적이며, 효율성을 추구하는 사람',
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const userMBTI = useSelector((state) => state.registerUserInfo.mbti);

  const updateMBTI = (value, index) => {
    const updateArr = [...MBTI].map((item, idx) => {
      return idx === index ? value : item;
    });
    setMBTI(updateArr);
  };

  useEffect(() => {
    if (userMBTI) {
      router.replace('/register/hobby');
    }
  }, [userMBTI]);

  const handleSubmit = () => {
    if (MBTI.includes('')) {
      alert('성향을 모두 선택해주세요');
    } else {
      setIsLoading(true);
      dispatch(
        setStoreMbti({ type: MBTI, description: MBTIType[MBTI.join('')] })
      );
    }
  };

  return (
    <div className='w-full h-dvh px-[40px] pt-[80px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='text-start w-3/5  flex flex-col gap-[10px]'>
          <p className='text-title text-main-red'>MBTI</p>
          <p className='text-subtitle break-keep text-gray-500'>
            회원님의 MBTI성향을 선택해주세요
          </p>
        </div>

        <div className='w-full flex gap-[20px]'>
          <button
            className={`${MBTI[0] === 'I' ? 'focus-btn' : 'btn'} size-[50px]`}
            onClick={() => updateMBTI('I', 0)}
          >
            I
          </button>
          <button
            className={`${MBTI[0] === 'E' ? 'focus-btn' : 'btn'} size-[50px]`}
            onClick={() => updateMBTI('E', 0)}
          >
            E
          </button>
          <p
            className={`flex-1 text-info break-keep content-center ${MBTI[0] ? 'animate-fadeIn' : ''}`}
          >
            {!MBTI[0]
              ? ''
              : MBTI[0] === 'I'
                ? '깊이있는 대인관계를 유지하며'
                : '폭넓은 대인관계를 유지하며'}
          </p>
        </div>
        <div className='w-full flex gap-[20px]'>
          <button
            className={`${MBTI[1] === 'N' ? 'focus-btn' : 'btn'} size-[50px]`}
            onClick={() => updateMBTI('N', 1)}
          >
            N
          </button>
          <button
            className={`${MBTI[1] === 'S' ? 'focus-btn' : 'btn'} size-[50px]`}
            onClick={() => updateMBTI('S', 1)}
          >
            S
          </button>
          <p
            className={`flex-1 text-info break-keep content-center ${MBTI[1] ? 'animate-fadeIn' : ''}`}
          >
            {!MBTI[1]
              ? ''
              : MBTI[1] === 'N'
                ? '현재 지향적이고'
                : '미래 지향적이고'}
          </p>
        </div>
        <div className='w-full flex gap-[20px]'>
          <button
            className={`${MBTI[2] === 'F' ? 'focus-btn' : 'btn'} size-[50px]`}
            onClick={() => updateMBTI('F', 2)}
          >
            F
          </button>
          <button
            className={`${MBTI[2] === 'T' ? 'focus-btn' : 'btn'} size-[50px]`}
            onClick={() => updateMBTI('T', 2)}
          >
            T
          </button>
          <p
            className={`flex-1 text-info break-keep content-center ${MBTI[2] ? 'animate-fadeIn' : ''}`}
          >
            {!MBTI[2]
              ? ''
              : MBTI[2] === 'F'
                ? '사람과 관계에 관심이 있으며'
                : '진실과 사실에 관심이 있으며'}
          </p>
        </div>
        <div className='w-full flex gap-[20px]'>
          <button
            className={`${MBTI[3] === 'P' ? 'focus-btn' : 'btn'} size-[50px]`}
            onClick={() => updateMBTI('P', 3)}
          >
            P
          </button>
          <button
            className={`${MBTI[3] === 'J' ? 'focus-btn' : 'btn'} size-[50px]`}
            onClick={() => updateMBTI('J', 3)}
          >
            J
          </button>
          <p
            className={`flex-1 text-info break-keep content-center ${MBTI[3] ? 'animate-fadeIn' : ''}`}
          >
            {!MBTI[3]
              ? ''
              : MBTI[3] === 'P'
                ? '목적과 방향은 변화 가능한 사람'
                : '분명한 목적과 방향이 있는 사람'}
          </p>
        </div>

        {!MBTI.includes('') && (
          <p
            className={`mt-[20px] text-info text-main-red break-keep px-[20px] ${!MBTI.includes('') ? 'animate-fadeIn' : ''}`}
          >
            {MBTIType[MBTI.join('')]}이시군요
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={MBTI.includes('')}
          className={`absolute bottom-[40px] left-0 ${MBTI.includes('') ? 'btn' : 'full-btn'}  w-full h-[50px] content-center cursor-pointer`}
        >
          {isLoading ? '확인중...' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default RegisterMBTI;
