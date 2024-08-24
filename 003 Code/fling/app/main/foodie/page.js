'use client';

import React, { useState, useEffect } from 'react';
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

  const [keyword, setKeyword] = useState('대전광역시 덕명동 맛집');
  // const [category, setCategory] = useState();

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: {
              place_name: data[i].place_name,
              road_address_name: data[i].road_address_name,
              phone: data[i].phone,
              category_group_name: data[i].category_group_name,
              category_name: data[i].category_name,
            },
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, keyword]);

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
            <div className='flex gap-[10px]'>
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
                        setKeyword(`${si} ${siGunGu} ${Dong} 맛집`);
                      }}
                    >
                      {Dong}
                    </SelectItem>
                  ))}
              </Select>
            </div>
          </div>

          <Map // 로드뷰를 표시할 Container
            center={{
              lat: 37.566826,
              lng: 126.9786567,
            }}
            className='w-full h-[250px] rounded-[10px]'
            level={1}
            onCreate={setMap}
          >
            {markers.map((marker) => (
              <>
                <MapMarker
                  key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                  position={marker.position}
                  onClick={() => setInfo(marker)}
                  className='w-full rounded-[5px] text-center'
                />
                <CustomOverlayMap
                  position={{
                    lat: marker.position.lat,
                    lng: marker.position.lng,
                  }}
                  yAnchor={2.2}
                >
                  {info &&
                    info.content.place_name === marker.content.place_name && (
                      <div
                        key={marker.content.place_name}
                        className='w-fit bg-white h-auto px-[10px] py-[5px] focus-btn'
                      >
                        {marker.content.category_name.split(' > ').slice(-1)[0]}
                      </div>
                    )}
                </CustomOverlayMap>
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
                  key={marker.content.place_name}
                  className='w-full h-auto focus-btn flex flex-col px-[20px] py-[10px]'
                >
                  <p className='text-subtitle text-black'>
                    {marker.content.place_name}
                  </p>
                  <p className='text-info'>
                    {marker.content.category_name.replace('음식점 > ', '')}
                  </p>
                  <p className='text-info text-black'>
                    {marker.content.phone !== '' ? marker.content.phone : '-'}
                  </p>
                </button>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default FoodiePage;
