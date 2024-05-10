const Last = () => {
  return (
    <>
      <div className='size-full'>
        <div className='size-full flex flex-col items-center justify-center translate-y-[20px]'>
          <div className='flex flex-col items-center justify-center mb-[20px]'>
            <span
              className='mb-[16px]'
              style={{ fontSize: '20px', fontWeight: '700' }}
            >
              🎉 회원가입이 완료되었어요!
            </span>
            <span className='mb-[8px]' style={{ fontSize: '12px' }}>
              여러분의 프로필을 작성한 후 매칭이 가능합니다
            </span>
            <span className='mb-[8px]' style={{ fontSize: '12px' }}>
              Mypage -&gt; 프로필수정, 나의 취미, 나의 성격
            </span>
          </div>
          <button className='w-[50%] btn p-[20px] mb-[20px]' onClick={() => {}}>
            메인으로 -&gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default Last;
