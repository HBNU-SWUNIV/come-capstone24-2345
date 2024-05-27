const ChatFalse = () => {
  return (
    <div className='size-full flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center mb-[20px]'>
        <span
          className='mb-[16px]'
          style={{ fontSize: '20px', fontWeight: '700' }}
        >
          💬 현재 매칭된 상대가 없어요
        </span>
        <span className='mb-[8px]' style={{ fontSize: '12px' }}>
          매칭 후에 상대와 대화를 나눠봐요
        </span>
      </div>
      <button className='w-[50%] btn p-[20px] mb-[20px]'>홈으로 -&gt;</button>
    </div>
  );
};

export default ChatFalse;
