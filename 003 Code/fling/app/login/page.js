export default function Login() {
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
        <form className='flex mb-[16px]'>
          <div className='flex flex-col gap-y-[8px]'>
            <input
              className='card-light w-[200px] h-[40px] rounded-full px-[16px]'
              placeholder='이메일'
              type='email'
              style={{ fontSize: '12px' }}
            />

            <input
              className='card-light w-[200px] h-[40px] rounded-full box-border px-[16px]'
              placeholder='비밀번호'
              type='password'
              style={{ fontSize: '12px' }}
            />
          </div>
          <button
            className='card-light flex w-[40px] h-full bg-main-pink/70 rounded-full text-start text-white justify-center items-center box-border ml-[8px]'
            type='submit'
            style={{ fontSize: '12px' }}
          >
            <p>-&gt;</p>
          </button>
        </form>
        <div style={{ fontSize: '10px' }}>
          <span>비밀번호를 잊으셨나요?</span>
          <a className='ml-[10px] underline' href='/main'>
            비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
}
