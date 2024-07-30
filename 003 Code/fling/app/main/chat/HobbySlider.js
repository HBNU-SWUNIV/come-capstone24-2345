import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HobbySlider = () => {
  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '10px',
    // slidesToShow: 2,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
    // cssEase: 'linear',
  };
  const arr = [
    ['game', '게임'],
    ['billiards', '당구'],
    ['travel', '해외여행'],
    ['camping', '글램핑'],
    ['movie', '영화관람'],
  ];
  return (
    <Slider {...settings}>
      {arr.map((element, idx) => {
        return (
          <div key={element}>
            <div className='h-[50px] justify-center items-center flex gap-[10px] focus-btn px-[10px] mx-[5px]'>
              <Image
                src={`/register/hobby/unchecked/${element[0]}.svg`}
                alt={element[1]}
                width={25}
                height={25}
              />
              <span className='text-subtitle text-main-red'>{element[1]}</span>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default HobbySlider;
