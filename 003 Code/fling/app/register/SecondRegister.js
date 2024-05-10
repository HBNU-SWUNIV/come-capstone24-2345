const Second = () => {
  return (
    <>
      <div className='w-full flex flex-col'>
        <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
          <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
            이름
          </span>
          <input placeholder='홍길동' className='bg-transparent' />
        </div>

        <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
          <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
            생년월일
          </span>
          <input placeholder='19990101' className='bg-transparent' />
        </div>

        <button
          className='card p-[20px] mb-[20px] rounded-full'
          onClick={() => {
            clickBtn();
          }}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default Second;
