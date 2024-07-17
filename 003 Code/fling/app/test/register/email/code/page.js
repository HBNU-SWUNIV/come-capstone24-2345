'use client';

import { useState } from 'react';

const RegisterEmailCode = () => {
  let [code, setCode] = useState(['', '', '', '']);

  const handleInput = (e, index) => {
    let copy = [...code];
    if (isNaN(e.target.value)) {
      copy[index] = '';
    } else if (e.target.value.length > 1) {
      copy[index] = e.target.value[0];
    } else {
      copy[index] = e.target.value;
    }
    setCode(copy);
  };
  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-center'>
          <span style={{ fontSize: '34px' }}>00:42</span>
          <div style={{ fontSize: '16px' }} className='my-[10px] opacity-70'>
            <p>저희가 보낸</p>
            <p>4자리 인증번호를 입력해주세요</p>
          </div>
        </div>

        <form className='w-full flex gap-[10px] mt-[40px]'>
          {code.map((element, index) => {
            return (
              <input
                key={`emailCode${index}`}
                style={{ fontSize: '34px' }}
                onChange={(e) => {
                  handleInput(e, index);
                }}
                value={code[index]}
                placeholder='0'
                inputMode='numeric'
                className={`w-1/4 aspect-square rounded-[15px] border border-solid ${code[index] == '' ? 'bg-white text-black border-[#E8E6EA]' : `bg-main-red text-white`} text-center`}
              />
            );
          })}
        </form>
        <button className='text-main-red mt-[20px]'>인증번호 재전송</button>

        <button className='absolute bottom-[50px] w-[calc(100%_-_80px)] h-[60px] my-[20px] rounded-[15px] bg-[#e94057] text-white'>
          다음
        </button>
      </div>
    </div>
  );
};

export default RegisterEmailCode;
