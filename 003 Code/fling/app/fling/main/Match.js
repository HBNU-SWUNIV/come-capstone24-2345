const Match = () => {
  return (
    <>
      <div
        className='w-full text-start mt-[20px] mb-[20px]'
        style={{ fontSize: '16px' }}
      >
        <span className='mr-2'>🏫</span>
        <span>국립한밭대학교</span>
      </div>
      <div className='card rounded-[20px] w-full flex flex-col items-center py-[20px] mb-[20px]'>
        <div className='w-[100px] h-[100px] my-[8px]'>
          <img className='size-full' src='/main-search-heart.svg' />
        </div>
        <div className='flex flex-col my-[8px]' style={{ fontSize: '12px' }}>
          <div className='flex flex-col leading-4'>
            <span>---님의 오늘의 운세는 어떨까요?</span>
            <span>좋은 만남을 위해 운세를 확인하고 매칭해봐요!</span>
          </div>
          <div className='mt-[8px]' style={{ fontSize: '10px' }}>
            <span className='text-indigo-700'>
              매칭 시 10,000코인이 소모됩니다
            </span>
          </div>
        </div>
        <div className='my-[4px]'>
          <button
            style={{ fontSize: '14px' }}
            className='w-[140px] h-[40px] btn rounded-full flex justify-center items-center'
          >
            <span className='mr-[4px]'>확인 후 매칭</span>
            <img
              className='w-[14px] h-[14px]'
              src='/direction/chevron-right.svg'
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Match;
