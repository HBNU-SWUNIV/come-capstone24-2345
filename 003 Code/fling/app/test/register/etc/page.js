'use client';

import {
  setGlobalArmy,
  setGlobalDrinkLimit,
  setGlobalHeight,
  setGlobalSmoking,
} from '@/lib/store';
import { Slider, Button } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterEtc = () => {
  const [height, setHeight] = useState(null);
  const [drinkLimit, setDrinkLimit] = useState(1.5);
  const [smoking, setSmoking] = useState(null);
  const [army, setArmy] = useState(null);

  // useEffect(() => {
  //   console.log(height);
  //   console.log(smoking);
  //   console.log(army);
  // }, [height, smoking, army]);

  const heightRef = useRef();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleHeight = (e) => {
    if (e.target.value.length > 3) {
      heightRef.current.value = e.target.value.substr(0, 3);
    }
    let value = parseInt(e.target.value);
    console.log(value);
    setHeight(value);
  };

  const handleNext = () => {
    if (height === null || smoking === null || army === null) {
      alert('회원님의 정보를 모두 입력해주세요');
    } else if (height < 100 || height > 210) {
      alert('회원님의 키를 올바르게 입력해주세요');
    } else {
      dispatch(setGlobalHeight(height));
      dispatch(setGlobalDrinkLimit(drinkLimit));
      dispatch(setGlobalSmoking(smoking));
      dispatch(setGlobalArmy(army));
      router.push('/test/register/datingType');
    }
  };

  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-start'>
          <span className='text-title'>상세정보</span>
        </div>

        <div className='w-full mt-[20px] flex flex-col gap-[10px]'>
          <div className='w-full flex flex-col'>
            <div className='relative w-full'>
              <input
                ref={heightRef}
                onChange={handleHeight}
                type='number'
                inputMode='numeric'
                placeholder=' '
                className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn'
              />

              <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
                키
              </label>
              <p className='absolute right-[20px] top-[20px] text-gray-500'>
                cm
              </p>
            </div>
          </div>

          <div className='w-full flex flex-col'>
            <p className='my-[20px] text-subtitle text-start opacity-70'>
              회원님의 주량은 어떻게 되나요?
            </p>

            <div className='flex flex-col gap-2 w-full h-full max-w-md items-start justify-center'>
              <Slider
                aria-label='주량'
                size='md'
                minValue={0}
                maxValue={10}
                color='danger'
                step={0.5}
                value={drinkLimit}
                onChange={setDrinkLimit}
                startContent={
                  <Button
                    isIconOnly
                    radius='full'
                    variant='light'
                    onPress={() =>
                      setDrinkLimit((prev) => (prev >= 1 ? prev - 1 : 0))
                    }
                  >
                    <Image
                      src='/register/etc/wine-empty.svg'
                      alt='wine-empty'
                      width={20}
                      height={20}
                    />
                  </Button>
                }
                endContent={
                  <Button
                    isIconOnly
                    radius='full'
                    variant='light'
                    onPress={() =>
                      setDrinkLimit((prev) => (prev <= 9 ? prev + 1 : 10))
                    }
                  >
                    <Image
                      src='/register/etc/wine-fill.svg'
                      alt='wine-empty'
                      width={20}
                      height={20}
                    />
                  </Button>
                }
                className='max-w-md'
              />
              <p className='text-info'>{drinkLimit}병</p>
            </div>
          </div>

          <div className='w-full flex flex-col'>
            <p className='my-[20px] text-subtitle text-start opacity-70'>
              회원님은 담배를 피우시나요?
            </p>
            <div className='flex gap-[20px]'>
              <button
                onClick={() => setSmoking('smoking')}
                className={`w-full py-[15px] flex justify-center items-center gap-[10px] ${smoking === 'smoking' ? 'focus-btn' : 'btn'}`}
              >
                <Image
                  // src={`/register/etc/${smoking === 'smoking' ? 'checked' : 'unchecked'}/smoking.svg`}
                  src={`/register/etc/unchecked/smoking.svg`}
                  alt='smoking'
                  width={20}
                  height={20}
                />
                <span>흡연자</span>
              </button>
              <button
                onClick={() => setSmoking('noSmoking')}
                className={`w-full py-[15px] flex justify-center items-center gap-[10px] ${smoking === 'noSmoking' ? 'focus-btn' : 'btn'}`}
              >
                <Image
                  // src={`/register/etc/${smoking === 'noSmoking' ? 'checked' : 'unchecked'}/no-smoking.svg`}
                  src={`/register/etc/unchecked/no-smoking.svg`}
                  alt='no-smoking'
                  width={20}
                  height={20}
                />
                <span>비흡연자</span>
              </button>
            </div>
          </div>

          <div className='w-full flex flex-col'>
            <p className='my-[20px] text-subtitle text-start opacity-70'>
              회원님은 군대를 갔다오셨나요?
            </p>
            <div className='flex gap-[20px]'>
              <button
                onClick={() => setArmy('army')}
                className={`w-full py-[15px] flex justify-center gap-[10px] ${army === 'army' ? 'focus-btn' : 'btn'}`}
              >
                <span>군필</span>
              </button>
              <button
                onClick={() => setArmy('noArmy')}
                className={`w-full py-[15px] flex justify-center gap-[10px] ${army === 'noArmy' ? 'focus-btn' : 'btn'}`}
              >
                <span>미필</span>
              </button>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <button
            disabled={!height || smoking === null || army === null}
            onClick={handleNext}
            className={`w-full h-[60px] my-[20px] ${!height || smoking === null || army === null ? 'disabled-btn' : 'full-btn'}`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterEtc;
