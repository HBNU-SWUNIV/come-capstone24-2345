import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import styled from 'styled-components';

export default function MainSlider() {
  const content = [
    {
      title: '간편한 매칭',
      subtitle1: '단 한 번의 버튼 클릭으로',
      subtitle2: '완전한 랜덤 매칭이 이루어져요',
    },
    {
      title: '사용 방법',
      subtitle1: '상단의 코드 신청을 통해',
      subtitle2: '소개팅을 할 수 있도록 회원님을 선정해요',
    },
    {
      title: '무료 매칭',
      subtitle1: '상대방과의 매칭은',
      subtitle2: '일절 비용이 들지 않아요',
    },
  ];

  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );

  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    draggable: true,
    pauseOnHover: false,
    nextArrow: (
      <SlickButtonFix>
        <div className='size-[30px] relative opacity-80'>
          <Image
            src='/direction/chevron-right-red.svg'
            width={25}
            height={25}
            alt='chevron-right'
          />
        </div>
      </SlickButtonFix>
    ),
    prevArrow: (
      <SlickButtonFix>
        <div className='size-[30px] relative opacity-80'>
          <Image
            src='/direction/chevron-left-red.svg'
            width={25}
            height={25}
            alt='chevron-left'
          />
        </div>
      </SlickButtonFix>
    ),
  };

  return (
    <SliderContainer className='w-full px-[20px]'>
      <Slider {...settings}>
        <div className='w-full mb-[40px]'>
          <div className='w-full h-[270px] relative'>
            <Image src={`/start/0.svg`} fill alt='1page' />
          </div>
          <p className='text-title text-main-red my-[20px]'>
            {content[0].title}
          </p>
          <p className='text-subtitle text-black/50'>{content[0].subtitle1}</p>
          <p className='text-subtitle text-black/50'>{content[0].subtitle2}</p>
        </div>

        <div className='w-full mb-[20px]'>
          <div className='w-full h-[270px] relative'>
            <Image src={`/start/1.svg`} fill alt='2page' />
          </div>
          <p className='text-title text-main-red my-[20px]'>
            {content[1].title}
          </p>
          <p className='text-subtitle text-black/50'>{content[1].subtitle1}</p>
          <p className='text-subtitle text-black/50'>{content[1].subtitle2}</p>
        </div>

        <div className='w-full mb-[20px]'>
          <div className='w-full h-[270px] relative'>
            <Image src={`/start/2.svg`} fill alt='3page' />
          </div>
          <p className='text-title text-main-red my-[20px]'>
            {content[2].title}
          </p>
          <p className='text-subtitle text-black/50'>{content[2].subtitle1}</p>
          <p className='text-subtitle text-black/50'>{content[2].subtitle2}</p>
        </div>
      </Slider>
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 3px;
    padding: 0;
    position: relative;
  }

  li button {
    border: none;
    background: rgba(233, 64, 87, 0.5);
    color: transparent;
    cursor: pointer;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  li button::before {
    content: '';
  }

  li.slick-active button {
    border-radius: 100%;
    background: rgb(233, 64, 87);
  }
`;
