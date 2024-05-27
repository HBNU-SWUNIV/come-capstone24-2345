import { useState } from 'react';

const UserCheck = (props) => {
  let [content, setContent] = useState([
    {
      key: 'personality',
      img: 'heart-front',
      title: '성격이 비슷한 사람 조회',
      subtitle: '성격이 비슷하다면 끈끈한 연애',
      position: 'top-[-10%] left-[0%]',
    },
    {
      key: 'hobby',
      img: 'target-front',
      title: '같은 취미를 가진 사람 조회',
      subtitle: '같은 취미가 많다면 재밌는 연애',
      position: 'bottom-[12%] left-[10%]',
    },
    {
      key: 'mbti',
      img: 'fire-front',
      title: '나의 MBTI와 맞는 사람 조회',
      subtitle: '~~~~~',
      position: 'top-[10%] right-[-5%]',
    },
  ]);

  const fun = (key, src, title, position) => {
    return (
      <div
        key={key}
        className={`w-auto h-[100px] p-[8px] flex flex-col justify-center items-center absolute ${position}`}
      >
        <div
          className={`${key} flex flex-col justify-center items-center box-border p-[16px] card cursor-pointer`}
          onClick={() => {
            clickHandler(key);
          }}
        >
          <img className='w-[40px] h-[40px] mb-[8px]' src={`/${src}.svg`} />
          <span style={{ fontSize: '14px' }}>{title}</span>
        </div>
      </div>
    );
  };

  const clickHandler = (e) => {
    props.clickContent(e);
  };

  return (
    <div className='w-full h-[40%] relative'>
      {content.map((e, i) => {
        return fun(e.key, e.img, e.title, e.position);
      })}
    </div>
  );
};

export default UserCheck;
