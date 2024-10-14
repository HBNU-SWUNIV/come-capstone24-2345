import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';

export default function KakaoMap({ place }) {
  useKakaoLoader();

  const [center, setCenter] = useState({
    lat: 36.35813,
    lng: 127.3868,
  });
  const [kakaoMap, setKakaoMap] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [marker, setMarker] = useState();

  const redMarkerImage =
    'https://firebasestorage.googleapis.com/v0/b/fling-fdf18.appspot.com/o/images%2Fmarker%2Fmarker.svg?alt=media&token=6ab7bc38-361e-4c92-925f-f94414c9ec21';
  const blueMarkerImage =
    'https://firebasestorage.googleapis.com/v0/b/fling-fdf18.appspot.com/o/images%2Fmarker%2Fmarker2.svg?alt=media&token=edf7aa9d-dff9-4e57-b34c-21a1da852a56';

  const container = useRef();
  let sliderRef = useRef(null);
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'ease',
    beforeChange: (current, next) => {
      setActiveSlide(next);
    },
    draggable: true,
    nextArrow: (
      <SlickButtonFix>
        <div className='size-[25px] relative opacity-80 content-center'>
          <Image
            src='/direction/chevron-right-red.svg'
            width={20}
            height={20}
            alt='chevron-right'
          />
        </div>
      </SlickButtonFix>
    ),
    prevArrow: (
      <SlickButtonFix>
        <div className='size-[25px] relative opacity-80 content-center'>
          <Image
            src='/direction/chevron-left-red.svg'
            width={20}
            height={20}
            alt='chevron-left'
          />
        </div>
      </SlickButtonFix>
    ),
  };

  useEffect(() => {
    if (!kakaoMap) return;

    if (place.length !== 0) {
      let geocoder = new kakao.maps.services.Geocoder();

      const placePromises = place.map((item) => {
        return new Promise((resolve, reject) => {
          geocoder.addressSearch(item.data.address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve({ position: { lat: result[0].y, lng: result[0].x } });
            }
          });
        });
      });

      Promise.all(placePromises).then((placeList) => {
        setMarker(placeList);
      });
    } else {
      setMarker(null);
    }
  }, [kakaoMap, place, activeSlide]);

  useEffect(() => {
    if (!kakaoMap) return;

    marker && setCenter(marker[activeSlide].position);
  }, [marker, activeSlide, kakaoMap]);

  const handleMarker = (index, position) => {
    setCenter(position);
    sliderRef.current.slickGoTo(index);
  };

  return (
    <Map
      className='absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-[440px] min-w-[330px] h-dvh flex items-end justify-center pb-[100px]'
      ref={container}
      center={center}
      isPanto={true}
      onCreate={setKakaoMap}
      level={3}
    >
      {marker &&
        marker.length !== 0 &&
        marker.map((item, idx) => {
          return (
            <MapMarker
              image={{
                src: idx === activeSlide ? redMarkerImage : blueMarkerImage,
                size:
                  idx === activeSlide
                    ? {
                        width: 40,
                        height: 45,
                      }
                    : {
                        width: 30,
                        height: 35,
                      },
              }}
              onClick={() => handleMarker(idx, item.position)}
              position={item.position}
              zIndex={`${idx === activeSlide ? 9 : 1}`}
            />
          );
        })}
      <section className='absolute bottom-[80px] left-1/2 transform -translate-x-1/2 w-full h-[150px] px-[30px] z-[9] bg-white/80 card-border'>
        {place.length !== 0 ? (
          <SliderContainer>
            <Slider ref={sliderRef} {...sliderSettings}>
              {place.map((item, idx) => {
                return (
                  <div key={item.data} className='w-full h-[150px] relative'>
                    <div className='absolute left-1/2 transform -translate-x-1/2 top-0 size-full flex items-center gap-[20px] px-[5px]'>
                      <div className='size-[120px] bg-gray-200 rounded-small relative'>
                        {item.data.img && (
                          <Image
                            src={item.data.img[0]}
                            alt={item.data.title}
                            fill
                            className='rounded-small'
                          />
                        )}
                      </div>
                      <div className='flex-1 size-full py-[20px] flex flex-col text-start justify-around'>
                        <div className='flex justify-between items-start'>
                          <span>{item.data.title}</span>
                          <span className='text-info'>
                            {idx + 1}/{place.length}
                          </span>
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-info'>{item.data.address}</span>
                          <span className='text-info'>{item.data.phone}</span>
                          <span className='text-info text-main-red'>
                            {item.data.tag.map((item) => `#${item}`).join(' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </SliderContainer>
        ) : (
          <div className='size-full flex justify-center items-center text-gray-500'>
            검색결과 없음
          </div>
        )}
      </section>
    </Map>
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
