const Review = (props) => {
  const clickHandler = (e) => {
    props.clickContent(e);
  };
  return (
    <div className='w-full h-[20%] relative'>
      <div className='w-auto h-[100px] p-[8px] flex flex-col justify-center items-center absolute top-[10%] right-[10%]'>
        <div
          className='review flex flex-col justify-center items-center box-border p-[16px] card cursor-pointer'
          onClick={() => {
            clickHandler('review');
          }}
        >
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
  );
};

export default Review;
