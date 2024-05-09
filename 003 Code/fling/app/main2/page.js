const Page = () => {
  return (
    <div className='size-full'>
      <div className='w-full h-[25%] relative'>
        <div
          className='w-[170px] h-[40px] flex justify-center items-center card bg-white'
          style={{ fontSize: '16px' }}
        >
          <span className='mr-2'>🏫</span>
          <span>국립한밭대학교</span>
        </div>
        <div className='w-auto h-auto p-[8px] absolute bottom-[20%] right-0'>
          <div className='matching flex flex-col justify-center items-center p-[15px] box-content card'>
            <img className='mb-[8px]' src='/main-search-heart.svg' />
            <div
              className='flex flex-col items-center leading-4'
              style={{ fontSize: '14px' }}
            >
              <span>좋은 만남을 위해</span>
              <span>운세를 확인하고 매칭해봐요!</span>
            </div>
            <span
              style={{ fontSize: '10px' }}
              className='text-indigo-800 mt-[8px]'
            >
              매칭 시 10,000코인이 소모됩니다
            </span>
          </div>
        </div>
      </div>
      <div className='w-full h-[30%] relative'>
        <div className='w-auto h-[100px] p-[8px] flex flex-col justify-center items-center absolute top-[-15%] left-[2%]'>
          <div className='personality flex flex-col justify-center items-center box-border p-[16px] card'>
            <img
              className='w-[40px] h-[40px] mb-[8px]'
              src='/heart-front.svg'
            />
            <span style={{ fontSize: '14px' }}>성격 비슷한 사람</span>
          </div>
        </div>
        <div className='w-auto h-[100px] p-[8px] flex flex-col justify-center items-center absolute bottom-[-20%] left-[10%]'>
          <div className='hobby flex flex-col justify-center items-center box-border p-[16px] card'>
            <img
              className='w-[40px] h-[40px] mb-[8px]'
              src='/target-front.svg'
            />
            <span style={{ fontSize: '14px' }}>같은 취미 가진 사람</span>
          </div>
        </div>
        <div className='w-auto h-[100px] p-[8px] flex flex-col justify-center items-center absolute bottom-[45%] right-[-5%]'>
          <div className='mbti flex flex-col justify-center items-center box-border p-[16px] card'>
            <img className='w-[40px] h-[40px] mb-[8px]' src='/fire-front.svg' />
            <span style={{ fontSize: '14px' }}>MBTI 맞는 사람</span>
          </div>
        </div>
      </div>
      <div className='w-full h-[20%] relative'>
        <div className='w-auto h-[100px] p-[8px] flex flex-col justify-center items-center absolute top-[65%] right-[10%]'>
          <div className='review flex flex-col justify-center items-center box-border p-[16px] card'>
            <div className='h-[40px] flex flex-col justify-center items-center leading-4'>
              <span style={{ fontSize: '16px' }}>플링 사용 후기 ✍🏻</span>
              <span
                className='text-indigo-800 mt-[8px]'
                style={{ fontSize: '10px' }}
              >
                플링으로 만남이 이루어진 여러분들의 이야기들
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
