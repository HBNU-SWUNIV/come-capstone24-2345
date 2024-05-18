const Match = (props) => {
  const clickHandler = (content) => {
    props.clickContent(content);
  };
  return (
    <div className='w-full h-[33%] bg-black/50 relative'>
      <div className='w-[50%] absolute right-0'>
        <div
          className='matching flex flex-col justify-center items-center p-[15px] box-content card cursor-pointer'
          onClick={() => {
            clickHandler('match');
          }}
        >
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
  );
};

export default Match;
