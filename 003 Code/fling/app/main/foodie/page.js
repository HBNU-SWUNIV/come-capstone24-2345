'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { Select, SelectItem } from '@nextui-org/react';
import DaejeonData from './DaejeonInfo.json';

const FoodiePage = () => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  const [si, setSi] = useState();
  const [siGunGu, setSiGunGu] = useState();
  const [dong, setDong] = useState();
  const [matzip, setMatzip] = useState([]);

  const [keyword, setKeyword] = useState('');
  // const [category, setCategory] = useState();

  // useEffect(() => {
  //   if (!map) return;
  //   const ps = new kakao.maps.services.Places();

  //   ps.keywordSearch(keyword, (data, status, _pagination) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       const bounds = new kakao.maps.LatLngBounds();
  //       let markers = [];

  //       for (let i = 0; i < data.length; i++) {
  //         // @ts-ignore
  //         markers.push({
  //           position: {
  //             lat: data[i].y,
  //             lng: data[i].x,
  //           },
  //           content: {
  //             place_name: data[i].place_name,
  //             road_address_name: data[i].road_address_name,
  //             phone: data[i].phone,
  //             category_group_name: data[i].category_group_name,
  //             category_name: data[i].category_name,
  //           },
  //         });
  //         // @ts-ignore
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //       }
  //       setMarkers(markers);
  //       console.log(markers);

  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //       map.setBounds(bounds);
  //     }
  //   });
  // }, [map, keyword]);

  useEffect(() => {
    if (!map) return;

    let markers = [];
    const bounds = new kakao.maps.LatLngBounds();
    if (matzip) {
      matzip.forEach((element) => {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(element.data.address, (result, status) => {
          if (status == kakao.maps.services.Status.OK) {
            markers.push({
              position: {
                lat: result[0].y,
                lng: result[0].x,
              },
              content: {
                title: element.data.title,
                address: element.data.address,
                category: element.data.category,
                phone: element.data.phone,
                tag: element.data.tag,
                type: element.type,
              },
            });
            bounds.extend(new kakao.maps.LatLng(result[0].y, result[0].x));
          }
        });
      });
      console.log(bounds);
      setMarkers(markers);
    }
  }, [map, matzip]);

  const handleSearch = async () => {
    setMarkers([]);
    await axios.get(`/api/foodie/${si}/${siGunGu}/${dong}`).then((res) => {
      // console.log(res.data);
      setMatzip(res.data);
    });
    // setKeyword('대전광역시 유성구 봉명동 맛집');
  };

  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] flex flex-col gap-[20px]'>
          <div className='w-full flex flex-col gap-[10px]'>
            <Select
              label='시'
              placeholder='시를 선택해주세요'
              variant='bordered'
              className='flex-grow'
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
            <button onClick={handleSearch} className='full-btn w-full h-[50px]'>
              검색
            </button>
          </div>

          <div className='w-full flex flex-col gap-[30px]'>
            <Map // 로드뷰를 표시할 Container
              center={{
                lat: 36.35813,
                lng: 127.3868,
              }}
              // isPanto={true}
              className='w-full h-[250px] rounded-[10px] border-2 border-solid border-gray-300 sticky top-[120px]'
              level={6}
              // onCreate={setMap}
            >
              {markers &&
                markers.map((marker) => (
                  <>
                    <MapMarker
                      key={`marker-${marker.content}-${marker.position}`}
                      position={marker.position}
                      onClick={() => setInfo(marker)}
                      className='w-full rounded-[5px] text-center'
                    />
                    {/* <CustomOverlayMap
                      key={`overlay-${marker.content}-${marker.position}`}
                      position={{
                        lat: marker.position.lat,
                        lng: marker.position.lng,
                      }}
                      // yAnchor={2.2}
                    >
                      {info && info.content.title === marker.content.title && (
                        <div
                          key={`info-${marker.content.title}`}
                          className='w-fit bg-white h-auto flex flex-col px-[10px] py-[5px] focus-btn'
                        >
                          <span>{marker.content.title}</span>
                          <span className='text-info'>
                            {marker.content.tag
                              .map((tag) => `#${tag}`)
                              .join(' ')}
                          </span>
                        </div>
                      )}
                    </CustomOverlayMap> */}
                  </>
                ))}
            </Map>
            {/* <div className='w-full flex gap-[10px]'>
            <button className='focus-btn w-[70px] py-[5px]'>음식점</button>
            <button className='focus-btn w-[70px] py-[5px]'>카페</button>
          </div> */}
            <section className='w-full flex-grow overflow-y-scroll flex flex-col gap-[10px] mb-[120px]'>
              {markers.map((marker) => {
                return (
                  <button
                    key={marker.content.title}
                    className='w-full h-auto focus-btn flex flex-col px-[20px] py-[10px]'
                  >
                    <p className='text-subtitle text-black'>
                      {marker.content.title}
                    </p>
                    <p className='text-info'>{marker.content.category}</p>
                    {/* <p className='text-info text-black'>
                    {marker.content.phone !== '' ? marker.content.phone : '-'}
                  </p> */}
                  </button>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodiePage;
