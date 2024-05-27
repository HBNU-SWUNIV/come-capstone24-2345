import { useState } from 'react';

const Slider = (props) => {
  // 애니메이션 제어 할 상태 변수
  const [animate, setAnimate] = useState(true);
  // 마우스가 슬라이더 진입 시 호출, false값으로 애니메이션 중지
  const onStop = () => setAnimate(false);
  // 마우스가 슬라이더 떠날 때 호출, true값으로 애니메이션 재시작
  const onRun = () => setAnimate(true);

  return (
    <div className='wrapper'>
      <div className='slide_container'>
        <ul
          className='slide_wrapper'
          onMouseEnter={onStop}
          onMouseLeave={onRun}
        >
          <div className={`slide original ${animate ? '' : ' stop'}`}>
            {props.texts.map((text, i) => (
              <div
                key={text}
                className='item w-max card p-[20px] mr-[8px] rounded-[20px]'
              >
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className={`slide clone ${animate ? '' : ' stop'}`}>
            {props.texts.map((text, i) => (
              <div
                key={text}
                className='item w-max card p-[20px] mr-[8px] rounded-[20px]'
              >
                <span>{text}</span>
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};
export default Slider;
