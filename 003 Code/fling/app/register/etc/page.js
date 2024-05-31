'use client';

import {
  setGlobalDrinkLimit,
  setGlobalHeight,
  setGlobalSmoking,
} from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterMBTI = () => {
  let [height, setHeight] = useState(null);
  let [drinkLimit, setDrinkLimit] = useState(0);
  let [smoking, setSmoking] = useState(null);

  const refHeight = useRef();
  const refRange = useRef();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/check/etc', { height, drinkLimit, smoking })
      .then((result) => {
        console.log(result.data);
        dispatch(setGlobalHeight(result.data.height));
        dispatch(setGlobalDrinkLimit(result.data.drinkLimit));
        dispatch(setGlobalSmoking(result.data.smoking));
        router.push('/register/photo');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handleHeight = (e) => {
    if (e.target.value.length > 3) {
      refHeight.current.value = e.target.value.substr(0, 3);
    }
    let value = parseInt(e.target.value);
    setHeight(value);
  };

  const handleDrinkLimit = (e) => {
    setDrinkLimit(parseFloat(e.target.value));
  };

  const handleSmoking = (e) => {
    if (e.target.dataset.smoking === 'true') {
      setSmoking(true);
    } else if (e.target.dataset.smoking === 'false') {
      setSmoking(false);
    }
  };
  return (
    <>
      <progress
        className='w-full max-w-[440px] fixed top-[60px]'
        value={17}
        min={0}
        max={100}
      ></progress>

      <form
        className='size-full flex flex-col'
        onSubmit={handleSubmit}
        method='POST'
      >
        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          회원님의 키와 주량을 입력해 주세요
        </span>

        <div className='w-full mb-[20px]'>
          <div className='w-full flex justify-between card rounded-[20px] mb-[20px] p-[20px]'>
            <div className='w-3/4 flex'>
              <p>📏</p>
              <input
                ref={refHeight}
                onChange={handleHeight}
                type='number'
                inputMode='decimal'
                placeholder='160'
                className='w-full bg-transparent ml-[8px]'
              />
            </div>
            <p>cm</p>
          </div>

          <label className='w-full'>
            <input
              type='range'
              className='w-[93%]'
              value={drinkLimit || 0}
              min={0}
              max={5}
              step={0.5}
              ref={refRange}
              onInput={handleDrinkLimit}
              list='drink'
            />
            <datalist
              id='drink'
              className='w-full grid grid-flow-col justify-items-center mt-[5px]'
            >
              <option className='w-[34px]' value='0'>
                알쓰
              </option>
              <option
                className='w-[1px] h-[1px] border-r border-black/20 border-solid'
                value='0.5'
              ></option>
              <option className='w-[34px]' value='1'>
                1병
              </option>
              <option
                className='w-[1px] h-[1px] border-r border-black/20 border-solid'
                value='1.5'
              ></option>
              <option className='w-[34px]' value='2'>
                2병
              </option>
              <option
                className='w-[1px] h-[1px] border-r border-black/20 border-solid'
                value='2.5'
              ></option>
              <option className='w-[34px]' value='3'>
                3병
              </option>
              <option
                className='w-[1px] h-[1px] border-r border-black/20 border-solid'
                value='3.5'
              ></option>
              <option className='w-[34px]' value='4'>
                4병
              </option>
              <option
                className='w-[1px] h-[1px] border-r border-black/20 border-solid'
                value='4.5'
              ></option>
              <option className='w-[34px]' value='5'>
                고래
              </option>
            </datalist>
          </label>
        </div>

        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          회원님의 흡연여부를 선택해 주세요
        </span>

        <div
          className='w-full flex justify-between gap-[20px] mb-[20px]'
          onClick={handleSmoking}
        >
          <div
            data-smoking={false}
            className={`w-1/2 p-[20px] rounded-[20px] cursor-pointer ${smoking === false ? 'btn' : 'card'}`}
          >
            🙅🏻 비흡연자
          </div>
          <div
            data-smoking={true}
            className={`w-1/2 p-[20px] rounded-[20px] cursor-pointer ${smoking === true ? 'btn' : 'card'}`}
          >
            🚬 흡연자
          </div>
        </div>

        <button type='submit' className='btn p-[20px] rounded-full'>
          다음
        </button>
      </form>
    </>
  );
};

export default RegisterMBTI;
