import { useState } from 'react';

const Third = (props) => {
  let [clicked, setClicked] = useState(false);

  const clickCert = () => {
    setClicked(true);
    // 메일로 인증번호 보내기
  };

  const clickBtn = () => {
    props.handlePage(props.page + 1);
  };

  const createCert = () => {
    if (clicked) {
      return (
        <>
          <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
            <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
              인증번호
            </span>
            <input placeholder='1234' className='bg-transparent' />
          </div>

          <button
            className='btn p-[20px] mb-[20px] rounded-full'
            onClick={clickBtn}
          >
            확인
          </button>
        </>
      );
    }
  };

  return (
    <div className='size-full flex flex-col p-[20px]'>
      <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
        <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
          대학교명
        </span>
        <input placeholder='국립한밭대학교' className='bg-transparent' />
      </div>

      <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
        <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
          학과명
        </span>
        <input placeholder='컴퓨터공학과' className='bg-transparent' />
      </div>

      <div className='flex flex-col p-[20px] card rounded-[20px] mb-[20px]'>
        <span className='text-start mb-[16px]' style={{ fontSize: '14px' }}>
          학교 이메일
        </span>
        <input placeholder='example@school.ac.kr' className='bg-transparent' />
      </div>

      <button
        className='btn p-[20px] mb-[20px]'
        onClick={() => {
          clickCert();
        }}
      >
        인증 요청
      </button>

      {createCert()}
    </div>
  );
};

export default Third;
