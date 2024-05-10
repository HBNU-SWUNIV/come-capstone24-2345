const First = () => {
  return (
    <div className='flex items-center'>
      <div className='w-full flex flex-col justify-center items-center translate-y-[-30px]'>
        <div className='w-full flex justify-center mb-[40px]'>
          <img
            className='w-[200px] h-[200px] translate-x-[20px]'
            src='/email-auth.svg'
          />
        </div>

        <div className='flex flex-col mb-[20px]'>
          <span className='mb-[8px]'>본인인증을 위해</span>
          <span>회원님의 학교이메일과 학생증이 필요해요</span>
        </div>

        <div
          className='card w-[160px] h-[50px] flex justify-center items-center rounded-full content-center mb-[20px]'
          style={{
            fontSize: '14px',
          }}
        >
          <p className='mr-[8px]'>본인인증</p>
          <p>-&gt;</p>
        </div>
      </div>
    </div>
  );
};

export default First;
