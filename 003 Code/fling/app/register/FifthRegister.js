const Fifth = (props) => {
  const clickBtn = () => {
    props.handlePage(props.page + 1);
  };
  return (
    <>
      <div className='size-full flex flex-col bg-yellow-400 pt-[20px]'>
        <div className='flex justify-between mb-[20px]'>
          <div className='w-[46%]'>
            <span style={{ fontSize: '18px' }}>프로필 사진</span>
            <div className='w-full flex justify-center items-center my-[20px] card aspect-square'>
              +
            </div>
            <div
              className='flex flex-col text-start pl-[20px]'
              style={{ fontSize: '12px' }}
            >
              <span className='mb-[8px]'>본인확인이 가능한 정면사진</span>
              <span className='mb-[8px]'>사진은 변환 처리됨</span>
              <span>본 사진은 공개되지 않음</span>
            </div>
          </div>
          <div className='w-[46%]'>
            <span style={{ fontSize: '18px' }}>학생증 사진</span>
            <div className='w-full flex justify-center items-center my-[20px] card aspect-square'>
              +
            </div>
            <div
              className='flex flex-col text-start pl-[20px]'
              style={{ fontSize: '12px' }}
            >
              <span className='mb-[8px]'>모바일, 실물 학생증만 가능</span>
              <span>이름과 본인사진을 포함해야 함</span>
            </div>
          </div>
        </div>

        <button className='btn p-[20px] mb-[20px]' onClick={clickBtn}>
          제출
        </button>
      </div>
    </>
  );
};

export default Fifth;
