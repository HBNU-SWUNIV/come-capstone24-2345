import { useState } from 'react';
import './ScrollingBanner.css';

const slides = [
  { color: 'red', target: '#' },
  { color: 'orange', target: '#' },
  { color: 'yellow', target: '#' },
  { color: 'green', target: '#' },
  { color: 'blue', target: '#' },
  { color: 'navy', target: '#' },
  { color: 'purple', target: '#' },
];

export default function ScrollingBanner() {
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  return (
    <div className='wrapper'>
      <div className='slide_container'>
        <ul
          className='slide_wrapper'
          onMouseEnter={onStop}
          onMouseLeave={onRun}
        >
          <div className={'slide original'.concat(animate ? '' : ' stop')}>
            {slides.map((s, i) => (
              <li key={i} className={i % 2 === 0 ? 'big' : 'small'}>
                <div className='item' style={{ background: s.color }}></div>
              </li>
            ))}
          </div>
          <div className={'slide clone'.concat(animate ? '' : ' stop')}>
            {slides.map((s, i) => (
              <li key={i} className={i % 2 === 0 ? 'big' : 'small'}>
                <div className='item' style={{ background: s.color }}></div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}
