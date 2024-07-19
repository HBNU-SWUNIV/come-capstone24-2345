'use client';

import { useRouter } from 'next/navigation';

const RegisterDatingType = () => {
  const router = useRouter();
  const handleNext = () => {
    router.replace('/test/register/datingType/question');
  };
  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-start'>
          <span className='text-title'>연애유형 테스트</span>
          <div className='my-[10px] opacity-70 text-subtitle'>
            <p>회원님의 연애유형을</p>
            <p>6가지의 간단한 질문을 통해 알아보려 해요</p>
            <p>아래 버튼을 눌러 해당 질문에 답을 택해주세요</p>
          </div>
        </div>

        <div className='absolute bottom-[50px] w-[calc(100%_-_80px)]'>
          <button
            onClick={handleNext}
            className={`w-full h-[60px] my-[20px] full-btn`}
          >
            테스트 시작
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterDatingType;
