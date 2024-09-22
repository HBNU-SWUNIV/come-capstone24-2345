'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from './../../../hooks/useKakaoLoader';
import { Select, SelectItem } from '@nextui-org/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DaejeonData from './DaejeonInfo.json';
import HeaderComponent from '../HeaderComponent';
import { motion } from 'framer-motion';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import styled from 'styled-components';
import Image from 'next/image';

const FoodiePage = () => {
  const [marker, setMarker] = useState();
  const [map, setMap] = useState();
  const [mapState, setMapState] = useState({
    center: {
      lat: 36.35813,
      lng: 127.3868,
    },
  });

  const [si, setSi] = useState();
  const [siGunGu, setSiGunGu] = useState();
  const [dong, setDong] = useState();
  const [category, setCategory] = useState();
  const [matzip, setMatzip] = useState([]);

  const [isClickSearchInput, setIsClickSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [activeSlide, setActiveSlide] = useState(0);

  const mapContainerRef = useRef();
  const modalRef = useRef();

  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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

  useOnClickOutside(modalRef, () => {
    setIsClickSearchInput(false);
  });

  useEffect(() => {
    useKakaoLoader();
  }, []);

  useEffect(() => {
    if (!map) return;

    if (matzip.length !== 0) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        matzip[activeSlide].data.address,
        (result, status) => {
          if (status == kakao.maps.services.Status.OK) {
            setMapState({ center: { lat: result[0].y, lng: result[0].x } });
            setMarker({ position: { lat: result[0].y, lng: result[0].x } });
          }
        }
      );
    }
  }, [map, matzip, activeSlide]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(37.50802, 127.062835);
        const options = {
          center,
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainerRef.current, options);
        setMap(map);
      });
    };
  }, [mapContainerRef]);

  const handleSearch = async () => {
    setSearchValue(`${si} ${siGunGu} ${dong} ${category}`);
    await axios
      .get(`/api/foodie/${si}/${siGunGu}/${dong}?category=${category}`)
      .then((res) => {
        setMatzip(res.data);
      });
    setIsClickSearchInput(false);
  };

  return (
    <>
      <HeaderComponent
        pageName={'장소추천'}
        setIsClickSearchInput={setIsClickSearchInput}
        isClickSearchInput={isClickSearchInput}
        searchValue={searchValue}
      />
      {isClickSearchInput && (
        <div className='bg-black/20 absolute w-full h-screen z-[99999] top-0 left-0 flex justify-center items-center'>
          <motion.div
            ref={modalRef}
            className='bg-white w-[90%] flex flex-col gap-[10px] rounded-[15px] p-[20px]'
          >
            <Select
              label='시'
              placeholder='시를 선택해주세요'
              variant='bordered'
              className='w-full'
              value={si}
              color='danger'
            >
              {Object.keys(DaejeonData).map((Si, idx) => (
                <SelectItem
                  key={Si + idx}
                  onClick={() => {
                    setSi(Si);
                  }}
                >
                  {Si}
                </SelectItem>
              ))}
            </Select>
            <Select
              label='시/군/구'
              placeholder='시/군/구를 선택해주세요'
              variant='bordered'
              className='w-full'
              value={siGunGu}
              color='danger'
            >
              {si &&
                Object.keys(DaejeonData[si]).map((SiGunGu, idx) => (
                  <SelectItem
                    key={SiGunGu + idx}
                    onClick={() => {
                      setSiGunGu(SiGunGu);
                    }}
                  >
                    {SiGunGu}
                  </SelectItem>
                ))}
            </Select>
            <Select
              label='읍/면/동'
              placeholder='읍/면/동을 선택해주세요'
              variant='bordered'
              className='w-full'
              value={dong}
              color='danger'
            >
              {siGunGu &&
                DaejeonData[si][siGunGu].map((Dong, idx) => (
                  <SelectItem
                    key={Dong + idx}
                    onClick={() => {
                      setDong(Dong);
                      // setKeyword(`${si} ${siGunGu} ${Dong} 맛집`);
                    }}
                  >
                    {Dong}
                  </SelectItem>
                ))}
            </Select>
            <Select
              label='카테고리'
              placeholder='카테고리를 선택해주세요'
              variant='bordered'
              className='w-full'
              value={category}
              color='danger'
            >
              {['카페', '술집', '양식', '일식', '중식', '한식'].map(
                (element) => {
                  return (
                    <SelectItem
                      key={si + siGunGu + dong + element}
                      onClick={() => setCategory(element)}
                    >
                      {element}
                    </SelectItem>
                  );
                }
              )}
            </Select>
            <button onClick={handleSearch} className='full-btn w-full h-[50px]'>
              검색
            </button>
          </motion.div>
        </div>
      )}
      <div className='w-full h-screen px-[40px] relative'>
        <div className='size-full flex flex-col items-center'>
          <div className='w-full mt-[120px] flex flex-col gap-[20px]'>
            <div className='w-full flex flex-col gap-[30px]'>
              <Map // 로드뷰를 표시할 Container
                ref={mapContainerRef}
                center={mapState.center}
                isPanto={true}
                className='max-w-[440px] min-w-[330px] w-full h-[calc(100vh_-_140px)] absolute top-[60px] left-1/2 transform -translate-x-1/2'
                level={4}
                onCreate={setMap}
              >
                {marker && <MapMarker position={marker.position} />}
              </Map>
              <section className='max-w-[440px] min-w-[330px] w-[95%] h-[160px] bg-main-red absolute bottom-[120px] left-1/2 transform -translate-x-1/2 rounded-[15px] px-[30px] py-[10px] border border-solid border-gray-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0'>
                {matzip.length === 0 ? (
                  <div className='size-full content-center'>
                    <span>검색된 결과가 없습니다</span>
                  </div>
                ) : (
                  <SliderContainer className='size-full content-center'>
                    <Slider {...sliderSettings}>
                      {matzip.map((element) => {
                        return (
                          <div className='w-full' key={element}>
                            <div className='size-full relative flex items-center'>
                              {element.data.img !== null ? (
                                <Image
                                  src={element.data.img[0]}
                                  width={120}
                                  height={120}
                                  alt={`${element.data.title}-img`}
                                  className='rounded-[10px]'
                                />
                              ) : null}
                              <div className='w-full flex-1 flex flex-col text-start pl-[20px] pr-[10px]'>
                                <div className='w-full flex justify-between items-center mb-[5px]'>
                                  <div className='flex gap-x-[10px] flex-wrap items-end'>
                                    <span>{element.data.title}</span>
                                    <span className='text-info'>
                                      ({element.data.category.join(', ')})
                                    </span>
                                  </div>
                                  <span className='text-info text-end'>
                                    {activeSlide + 1}/{matzip.length}
                                  </span>
                                </div>
                                <span className='text-subtitle'>
                                  {element.data.address}
                                </span>
                                <span className='text-subtitle'>
                                  {element.data.phone}
                                </span>
                                <span className='text-info'>
                                  {element.data.tag
                                    .map((item) => `#${item}`)
                                    .join(' ')}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Slider>
                  </SliderContainer>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodiePage;

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
