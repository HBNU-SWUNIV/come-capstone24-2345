import Link from 'next/link';

const RegisterDatingType = () => {
  return (
    <div className='w-full h-dvh px-[40px] pt-[80px] pb-[120px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='text-start w-4/5 flex flex-col gap-[10px]'>
          <p className='text-title text-main-red'>연애유형 테스트</p>
          <p className='text-subtitle break-keep text-gray-500'>
            회원님의 연애유형을 6가지의 간단한 질문을 통해 알아보려고 해요
          </p>
          <p className='text-subtitle text-gray-500'>
            각 질문에 답을 선택해주세요
          </p>
        </div>

        <Link
          href={'/register/datingType/question'}
          replace
          className={`absolute bottom-[-80px] w-full left-0 h-[50px] full-btn content-center cursor-pointer`}
        >
          테스트하기
        </Link>
      </div>
    </div>
  );
};

export default RegisterDatingType;
