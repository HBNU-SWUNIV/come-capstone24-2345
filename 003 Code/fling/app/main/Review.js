import StartRating from './StarRating';

const Review = () => {
  return (
    <>
      <div className='w-full text-start my-[20px]' style={{ fontSize: '16px' }}>
        <span className='mr-2'>✍🏻</span>
        <span>플링 사용 후기</span>
        <br />
        <span className='text-indigo-800' style={{ fontSize: '10px' }}>
          플링으로 만남이 이루어진 여러분들의 이야기들
        </span>
      </div>

      {/* <div className='overflow-x-scroll w-[300px]'> */}
      {/* <div className='flex w-[300%] box-border'> */}
      <div className='card bg-white w-full h-[250px] p-[20px] rounded-[20px] flex flex-col'>
        <div className='flex justify-between mb-[8px]'>
          <div
            className='text-start flex flex-col justify-center'
            style={{ fontSize: '12px' }}
          >
            {/* <StartRating />s */}
            {/* <span>&#9733;&#9733;&#9733;&#9733;&#9733; 5</span> */}
            <StartRating score={4} />
            <div className='mt-[4px]'>
              <span className='mr-[4px]'>남자 대학생</span>
              <span>24.03.01</span>
            </div>
          </div>
          <div
            className='btn rounded-full px-[20px] py-[15px]'
            style={{ fontSize: '12px' }}
          >
            <span className='mr-[8px]'>👍🏻</span>
            <span>13</span>
          </div>
        </div>

        <div className='w-full h-full flex flex-grow justify-center items-center'>
          <span>여러분의 후기가 필요해요</span>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Review;
