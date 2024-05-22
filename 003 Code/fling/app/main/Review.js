const Review = () => {
  return (
    <div>
      <div className='w-full text-start my-[20px]' style={{ fontSize: '16px' }}>
        <span className='mr-2'>✍🏻</span>
        <span>플링 사용 후기</span>
        <br />
        <span className='text-indigo-800' style={{ fontSize: '10px' }}>
          플링으로 만남이 이루어진 여러분들의 이야기들
        </span>
      </div>

      <div className='overflow-x-scroll w-[280px]'>
        <div className='flex w-[300%] box-border'>
          <div className='card bg-white w-full h-[200px] mx-[20px] rounded-[20px]'></div>
          <div className='card-light bg-white w-full h-[200px] px-[20px] rounded-[20px]'></div>
          <div className='card-light bg-white w-full h-[200px] px-[20px] rounded-[20px]'></div>
        </div>
      </div>
    </div>
  );
};

export default Review;
