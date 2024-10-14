'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Select, SelectItem } from '@nextui-org/react';
import DaejeonData from './DaejeonInfo.json';
import HeaderComponent from '../HeaderComponent';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import KakaoMap from './KakaoMap';

const PlacePage = () => {
  const [si, setSi] = useState();
  const [siGunGu, setSiGunGu] = useState();
  const [dong, setDong] = useState();
  const [category, setCategory] = useState();
  const [place, setPlace] = useState([]);

  const [sigunguList, setSigunguList] = useState();
  const mapContainer = useRef();

  const {
    isOpen: isMapOptionOpen,
    onOpen: onMapOptionOpen,
    onOpenChange: onMapOptionOpenChange,
  } = useDisclosure();
  const [searchValue, setSearchValue] = useState();

  const handleSearch = async () => {
    setSearchValue(`${si} ${siGunGu} ${dong} ${category}`);
    // setSearchValue(`${si} ${siGunGu} ${category}`);
    if (si && siGunGu && dong && category) {
      await axios
        .get(`/api/place/${si}/${siGunGu}/${dong}?category=${category}`)
        // .get(`/api/place/${si}/${siGunGu}/dong?category=${category}`)
        .then((res) => {
          setPlace(res.data);
        });
      onMapOptionOpenChange(false);
    } else {
      alert('장소를 모두 선택해주세요');
    }
  };

  useEffect(() => {
    const fetchDong = async () => {
      const result = await axios.post(`/api/place/${si}/list`);
      setSigunguList(result.data);
      console.log(result.data);
    };
    if (si) {
      fetchDong();
    }
  }, [si]);

  return (
    <>
      <HeaderComponent
        pageName={'장소'}
        onMapOptionOpenChange={onMapOptionOpenChange}
        searchValue={searchValue}
      />
      <div className='w-full h-dvh px-[40px] relative'>
        <div className='size-full flex flex-col items-center'>
          <div className='w-full mt-[120px] flex flex-col gap-[20px]'>
            <div ref={mapContainer} className='w-full flex flex-col gap-[30px]'>
              <KakaoMap place={place} />
            </div>
          </div>
        </div>

        <Modal
          className='w-4/5'
          isOpen={isMapOptionOpen}
          placement='center'
          onOpenChange={onMapOptionOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  장소를 선택해주세요
                </ModalHeader>
                <ModalBody>
                  <Select
                    label='시'
                    placeholder='시를 선택해주세요'
                    variant='bordered'
                    className='w-full'
                    value={si}
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
                  >
                    {sigunguList &&
                      Object.keys(sigunguList).map((SiGunGu, idx) => (
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
                  >
                    {sigunguList &&
                      siGunGu &&
                      sigunguList[siGunGu].map((Dong, idx) => (
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
                  >
                    {/* ['카페', '술집', '양식', '일식', '중식', '한식'] */}
                    {['술집'].map((element) => {
                      return (
                        <SelectItem
                          key={si + siGunGu + dong + element}
                          // key={si + siGunGu + element}
                          onClick={() => setCategory(element)}
                        >
                          {element}
                        </SelectItem>
                      );
                    })}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <button onClick={onClose} className='px-[20px] py-[5px] btn'>
                    취소
                  </button>
                  <button
                    // disabled={!si || !siGunGu || !dong || !category}
                    disabled={!si || !siGunGu || !category}
                    onClick={handleSearch}
                    // className={`${!si || !siGunGu || !dong || !category ? 'btn' : 'full-btn'} px-[20px] py-[5px]`}
                    className={`${!si || !siGunGu || !category ? 'btn' : 'full-btn'} px-[20px] py-[5px]`}
                  >
                    검색
                  </button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default PlacePage;
