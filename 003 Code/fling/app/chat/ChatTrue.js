const ChatTrue = () => {
  return (
    <div className='w-full h-[calc(100%_+_100px)]'>
      <div className='card p-[20px] text-start rounded-[20px]'>
        <span>👩🏻‍🎓 닉네임 님의 프로필</span>
        <div className='w-full flex justify-between my-[20px]'>
          <div className='w-[47%] aspect-square bg-[#FF006B] rounded-[20px]'></div>
          <div className='w-[47%] flex flex-col justify-between'>
            <div className='w-full card flex items-center px-[20px] py-[14px] rounded-[20px]'>
              <span className='w-[45%]' style={{ fontSize: '12px' }}>
                키
              </span>
              <span
                className='w-[50%] pl-[8px] border-l border-black/20 border-solid'
                style={{ fontSize: '13px' }}
              >
                165cm
              </span>
            </div>
            <div className='w-full card flex items-center px-[20px] py-[14px] rounded-[20px]'>
              <span className='w-[45%]' style={{ fontSize: '12px' }}>
                주량
              </span>
              <span
                className='w-[50%] pl-[8px] border-l border-black/20 border-solid'
                style={{ fontSize: '13px' }}
              >
                1.5병
              </span>
            </div>
            <div className='w-full card flex items-center px-[20px] py-[14px] rounded-[20px]'>
              <span className='w-[45%]' style={{ fontSize: '12px' }}>
                흡연여부
              </span>
              <span
                className='w-[50%] pl-[8px] border-l border-black/20 border-solid'
                style={{ fontSize: '13px' }}
              >
                비흡연
              </span>
            </div>
          </div>
        </div>

        <span>닉네임 님의 MBTI</span>
        <div className='w-full h-auto flex justify-between my-[20px]'>
          <div className='card p-[20px] rounded-[20px]'>
            <img className='size-[40px]' src='/mbti/I.svg' />
          </div>
          <div className='card p-[20px] rounded-[20px]'>
            <img className='size-[40px]' src='/mbti/S.svg' />
          </div>
          <div className='card p-[20px] rounded-[20px]'>
            <img className='size-[40px]' src='/mbti/F.svg' />
          </div>
          <div className='card p-[20px] rounded-[20px]'>
            <img className='size-[40px]' src='/mbti/P.svg' />
          </div>
        </div>

        <span>닉네임 님의 취미</span>
        <div className='w-[calc(100%_+_20px)] p-[20px] overflow-x-scroll translate-x-[-20px]'>
          <div className='flex w-min'>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>🎱 당구</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>🎳 볼링</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>🎾 테니스</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>🏂 보드</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>🎱 당구</span>
            </div>
          </div>
        </div>

        <span>닉네임 님의 성격</span>
        <div className='w-[calc(100%_+_20px)] p-[20px] overflow-x-scroll translate-x-[-20px]'>
          <div className='flex w-min'>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>활동적인</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>적극적인</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>대담한</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>유머러스한</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>능률적인</span>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col items-center mb-[20px]'>
          <div className='my-[20px]'>
            <span>닉네임님과 </span>
            <span>70.89</span>
            <span>% 일치</span>
          </div>
          <button className='w-[50%] btn p-[20px]'>채팅방 이동</button>
        </div>
      </div>
    </div>
  );
};

export default ChatTrue;
