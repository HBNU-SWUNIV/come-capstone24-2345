export default function Main() {
  return (
    <div className='size-full overflow-y-scroll'>
      <div
        className='w-full text-start mt-[20px] mb-[20px]'
        style={{ fontSize: '16px' }}
      >
        <span className='mr-2'>🏫</span>
        <span>국립한밭대학교</span>
      </div>
      <div className='card-light rounded-[20px] w-full flex flex-col items-center py-[10px] mb-[20px]'>
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
        <div className='my-[8px]'>
          <button
            style={{ fontSize: '14px' }}
            className='w-[140px] h-[40px] card-light rounded-full flex justify-center items-center'
          >
            <span className='mr-[4px] text-indigo-800'>확인 후 매칭</span>
            <img
              className='w-[14px] h-[14px]'
              src='/direction/chevron-right.svg'
            />
          </button>
        </div>
      </div>

      <div
        className='w-full text-start mt-[20px] mb-[20px]'
        style={{ fontSize: '16px' }}
      >
        <span>나와 비슷한 사람 조회하기</span>
        <span className='ml-2'>🔎</span>
        <br />
        <span className='text-indigo-800' style={{ fontSize: '10px' }}>
          나와 맞는 사람이 몇 명이나 있는지 조회할 수 있어요!
        </span>
      </div>

      <div className='card-light w-full h-[80px] px-[20px] rounded-[20px] flex items-center mb-[20px]'>
        <div className='w-[15%] flex justify-center items-center'>
          <img className='w-[40px] h-[40px]' src='/heart-front.svg' />
        </div>
        <div className='w-[75%] text-start pl-[15px]'>
          <span style={{ fontSize: '14px' }}>성격이 비슷한 사람 조회</span>
          <br />
          <span style={{ fontSize: '10px' }}>
            성격이 비슷하다면 끈끈한 연애
          </span>
        </div>
        <div className='w-[10%] flex justify-center items-center'>
          <img className='w-[12px] h-[12px]' src='/direction/arrow-right.svg' />
        </div>
      </div>

      <div className='card-light w-full h-[80px] px-[20px] rounded-[20px] flex items-center mb-[20px]'>
        <div className='w-[15%] flex justify-center items-center'>
          <img className='w-[40px] h-[40px]' src='/target-front.svg' />
        </div>
        <div className='w-[75%] text-start pl-[15px]'>
          <span style={{ fontSize: '14px' }}>같은 취미를 가진 사람 조회</span>
          <br />
          <span style={{ fontSize: '10px' }}>
            같은 취미가 많다면 재밌는 연애
          </span>
        </div>
        <div className='w-[10%] flex justify-center items-center'>
          <img className='w-[12px] h-[12px]' src='/direction/arrow-right.svg' />
        </div>
      </div>

      <div className='card-light w-full h-[80px] px-[20px] rounded-[20px] flex items-center mb-[20px]'>
        <div className='w-[15%] flex justify-center items-center'>
          <img className='w-[40px] h-[40px]' src='/fire-front.svg' />
        </div>
        <div className='w-[75%] text-start pl-[15px]'>
          <span style={{ fontSize: '14px' }}>나의 MBTI와 맞는 사람 조회</span>
          <br />
          <span style={{ fontSize: '10px' }}>~~</span>
        </div>
        <div className='w-[10%] flex justify-center items-center'>
          <img className='w-[12px] h-[12px]' src='/direction/arrow-right.svg' />
        </div>
      </div>
    </div>
  );
}
