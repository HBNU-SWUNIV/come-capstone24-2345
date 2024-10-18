import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import styled from 'styled-components';

export default function MainSlider() {
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );

  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    draggable: true,
    pauseOnHover: false,
    cssEase: 'ease',
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
    <SliderContainer className='h-full content-center'>
      <Slider {...settings} className='h-full content-center'>
        <div>
          <div className='flex flex-col py-[40px]'>
            <p className='text-title break-keep'>매주 월요일 오전</p>
            <p className='text-title break-keep'>9시에 유저를 선정해요</p>
            <p className='text-subtitle text-gray-500 break-keep mt-[10px]'>
              회원가입 코드는 오전 9시 10분에 전송해요
            </p>
            <div className='flex-grow relative flex items-center mt-[20px]'>
              <Image
                quality={100}
                src='/start/start1.svg'
                alt='start1'
                className='px-[20px] animate-float'
                fill
              />
            </div>
          </div>
        </div>

        <div>
          <div className='flex flex-col py-[40px]'>
            <p className='text-title break-keep'>같이 가볼만한</p>
            <p className='text-title break-keep'>분위기 있는 데이트 장소</p>
            <p className='text-subtitle text-gray-500 break-keep mt-[10px]'>
              데이트하기 좋은 장소를 알려드릴게요
            </p>
            <div className='flex-grow relative flex items-center mt-[20px]'>
              <Image
                quality={100}
                src='/start/start2.svg'
                alt='start2'
                className='px-[20px] animate-float'
                fill
              />
            </div>
          </div>
        </div>

        <div>
          <div className='flex flex-col py-[40px]'>
            <p className='text-title break-keep'>이성과 일주일간</p>
            <p className='text-title break-keep'>대화를 나눌 수 있어요</p>
            <p className='text-subtitle text-gray-500 break-keep mt-[10px]'>
              일주일이 지나면 계정은 자동으로 삭제돼요
            </p>
            <div className='flex-grow relative flex items-center mt-[20px]'>
              <Image
                quality={100}
                src='/start/start3.svg'
                alt='start3'
                className='px-[20px] animate-float'
                fill
              />
            </div>
          </div>
        </div>

        <div>
          <div className='flex flex-col py-[40px]'>
            <p className='text-title break-keep'>무료로 사용이 가능하고</p>
            <p className='text-title break-keep'>언제든지 탈퇴가 가능해요</p>
            <p className='text-subtitle text-gray-500 break-keep mt-[10px]'>
              참고로 채팅방을 나가면 계정이 삭제돼요
            </p>
            <div className='flex-grow relative flex items-center mt-[20px]'>
              <Image
                quality={100}
                src='/start/start4.svg'
                alt='start3'
                className='px-[20px] animate-float'
                fill
              />
            </div>
          </div>
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

  .slick-list,
  .slick-track {
    height: 100%;
    align-content: center;
  }

  .slick-slide {
    align-content: center;
    margin-bottom: 25px;
  }

  .slick-slide div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  li.slick-active button {
    border-radius: 100%;
    background: rgb(233, 64, 87);
  }
`;
