const ChatRoom = () => {
  const otherChat = (message, time) => {
    return (
      <div className='w-full h-fit flex pb-[30px] mb-[20px]'>
        <div className='size-[60px] bg-blue-400 rounded-[20px] mr-[8px]'></div>
        <div className='flex-1 flex items-end translate-y-[30px]'>
          <div className='max-w-[70%] px-[20px] py-[10px] text-wrap text-start card rounded-[20px]'>
            <span className=' leading-normal'>{message}</span>
          </div>
          <div className='ml-[8px]'>{time}</div>
        </div>
      </div>
    );
  };

  const myChat = (message, time) => {
    return (
      <div className='w-full h-fit flex mb-[20px]'>
        <div className='flex-1 flex justify-end items-end'>
          <div className='mr-[8px]'>{time}</div>
          <div className='max-w-[70%] px-[20px] py-[10px] text-wrap text-start mychat rounded-[20px]'>
            <span className=' leading-normal'>{message}</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-fit py-[10px] px-[20px] my-[20px] rounded-full card'>
        <span>2024.06.01 (일)</span>
      </div>

      <div className='w-full'>
        {otherChat(
          '안녕하세요 저는 한밭대학교다니고 있는 남학생입니다 만나서 반갑습니다',
          '15:31'
        )}

        {myChat(
          '안녕하세요 저는 한밭대학교다니고 있는 남학생입니다 만나서 반갑습니다',
          '15:31'
        )}

        {myChat(
          '안녕하세요 저는 한밭대학교다니고 있는 남학생입니다 만나서 반갑습니다',
          '15:31'
        )}

        {otherChat(
          '안녕하세요 저는 한밭대학교다니고 있는 남학생입니다 만나서 반갑습니다',
          '15:31'
        )}

        {otherChat(
          '안녕하세요 저는 한밭대학교다니고 있는 남학생입니다 만나서 반갑습니다',
          '15:31'
        )}

        {otherChat(
          '안녕하세요 저는 한밭대학교다니고 있는 남학생입니다 만나서 반갑습니다',
          '15:31'
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
