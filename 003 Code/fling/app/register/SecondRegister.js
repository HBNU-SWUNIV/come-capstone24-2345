const Second = (props) => {
  const clickBtn = () => {
    props.handlePage(props.page + 1);
  };
  return (
    <div className='size-full flex flex-col p-[20px]'>
      <progress
        className='w-full mb-[20px]'
        value={20}
        min={0}
        max={100}
      ></progress>
      <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
        회원님의 이름과 생년월일을 적어주세요
      </span>

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

      <button className='btn p-[20px] rounded-full' onClick={clickBtn}>
        다음
      </button>
    </div>
  );
};

export default Second;
