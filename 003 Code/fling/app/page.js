export default function Start() {
  return (
    <div className='flex flex-col size-full items-center'>
      <div className='w-full h-[20%]'>
        <div
          className='w-full h-[20%] text-end font-thin'
          style={{ fontSize: '30px', lineHeight: '50px' }}
        >
          <p>터치 단 한 번으로</p>
          <p>랜덤 소개팅</p>
          <div className='flex justify-end mt-[8px] font-medium items-center'>
            <img className='w-[50px] h-[50px] mr-[8px]' src='/logo.png' />
            <p>플링</p>
          </div>
        </div>
      </div>

      <div className='w-[120%] h-[65%] flex relative items-center'>
        <img
          className='w-[100%] h-[100%] absolute left-[-7%]'
          src='/login.svg'
        />
      </div>

      <div className='w-full h-[15%] flex flex-col items-center box-content pb-[80px]'>
        <div className='flex mb-[16px]'>
          <div
            className='card w-[160px] h-[50px] flex justify-center items-center rounded-full content-center mb-[20px]'
            style={{
              fontSize: '14px',
              fontWeight: '800',
            }}
          >
            <p className='mr-[8px]'>시작하기</p>
            <p>-&gt;</p>
          </div>
        </div>
        <div style={{ fontSize: '12px' }}>
          <span>이미 계정이 있으신가요?</span>
          <a className='ml-[10px] underline' href='/login'>
            로그인하기
          </a>
        </div>
      </div>

      {/* <div className='w-full h-[15%] flex flex-col items-center box-content pb-[80px]'>
        <div className='translate-y-[-20px]'>
          <div
            className='card w-[150px] h-[40px] flex justify-center items-center rounded-full content-center mb-[20px]'
            style={{
              fontSize: '12px',
            }}
          >
            <p className='mr-[8px]'>시작하기</p>
            <p>-&gt;</p>
          </div>
          <div style={{ fontSize: '10px' }}>
            <span>이미 계정이 있으신가요?</span>
            <a className='ml-[10px] underline' href='/login'>
              로그인하기
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}

{
  /* <div className='w-full h-[25%] flex flex-col justify-center items-center'>
  <div className='translate-y-[-30px]'>
    <div
      className='card w-[150px] h-[40px] flex justify-center items-center rounded-full content-center mb-[20px]'
      style={{
        fontSize: '12px',
      }}
    >
      <p className='mr-[8px]'>시작하기</p>
      <p>-&gt;</p>
    </div>
    <div style={{ fontSize: '10px' }}>
      <span>이미 계정이 있으신가요?</span>
      <a className='ml-[10px] underline' href='/login'>
        로그인하기
      </a>
    </div>
  </div>
</div>; */
}
