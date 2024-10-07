'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Slider, RadioGroup, Radio } from '@nextui-org/react';
import { Divider } from '@nextui-org/divider';
import {
  setStoreArmy,
  setStoreDrinkLimit,
  setStoreHeight,
  setStoreReligion,
} from '../../../library/store';

const RegisterEtc = () => {
  const [height, setHeight] = useState();
  const [isInvalidHeight, setIsInvalidHeight] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [drinkLimit, setDrinkLimit] = useState(1);
  const [religion, setReligion] = useState('없음');
  const [army, setArmy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userGender = useSelector((state) => state.registerUserInfo.gender);
  const userHeight = useSelector((state) => state.registerUserInfo.height);
  const userDrinkLimit = useSelector(
    (state) => state.registerUserInfo.drinkLimit
  );
  const userReligion = useSelector((state) => state.registerUserInfo.religion);
  const userArmy = useSelector((state) => state.registerUserInfo.army);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (height < 100 || height > 250) {
      setIsInvalidHeight(true);
    } else {
      setIsInvalidHeight(false);
    }
  }, [height]);

  useEffect(() => {
    if (userGender && userHeight && userReligion) {
      router.replace('/register/datingType');
    }
  }, [userGender, userHeight, userDrinkLimit, userReligion, userArmy]);

  const handleSubmit = () => {
    if (
      height &&
      !isInvalidHeight &&
      typeof smoking === 'boolean' &&
      religion &&
      typeof army === 'boolean'
    ) {
      setIsLoading(true);
      dispatch(setStoreHeight(height));
      dispatch(setStoreDrinkLimit(drinkLimit));
      dispatch(setStoreReligion(religion));
      dispatch(setStoreArmy(army));
    } else if (!userGender) {
      alert('잘못된 접근입니다');
      router.replace('/');
    } else {
      alert('상세정보를 모두 입력해주세요');
    }
  };

  return (
    <div className='w-full h-dvh px-[40px] pt-[80px] pb-[120px]'>
      <div className='size-full flex flex-col gap-[20px] relative'>
        <div className='text-start w-3/5 flex flex-col gap-[10px]'>
          <p className='text-title text-main-red'>상세정보</p>
        </div>

        <div className='w-full flex-1 flex gap-[20px] flex-col items-center overflow-y-scroll'>
          <Input
            variant='bordered'
            type='number'
            maxLength={3}
            isRequired
            isInvalid={height === '' ? false : isInvalidHeight}
            label='키'
            errorMessage='잘못된 값입니다'
            value={height}
            onValueChange={setHeight}
            endContent={
              <div className='pointer-events-none flex items-center'>
                <span className='text-info'>cm</span>
              </div>
            }
            classNames={{
              inputWrapper: 'border border-solid border-slate-200',
              errorMessage: 'text-start',
            }}
          />

          <div className='w-full flex flex-col gap-[10px] text-start'>
            <span className='text-subtitle text-main-red'>
              흡연을 하시나요?
            </span>
            <div className='w-full flex gap-[10px]'>
              <button
                onClick={() => setSmoking(true)}
                className={`flex-1 flex items-center justify-center gap-[10px] h-[50px] ${smoking ? 'focus-btn' : 'btn'}`}
              >
                <Image
                  src='/register/etc/unchecked/smoking.svg'
                  alt='smoking'
                  width={20}
                  height={20}
                />
                흡연자
              </button>
              <button
                onClick={() => setSmoking(false)}
                className={`flex-1 flex items-center justify-center gap-[10px] h-[50px] ${!smoking ? 'focus-btn' : 'btn'}`}
              >
                <Image
                  src='/register/etc/unchecked/no-smoking.svg'
                  alt='smoking'
                  width={20}
                  height={20}
                />
                비흡연자
              </button>
            </div>
          </div>

          <Divider className='w-[95%]' />

          <div className='w-full flex flex-col gap-[10px] text-start'>
            <span className='text-subtitle text-main-red'>
              주량은 어느정도 이신가요?
            </span>
            <div className='w-full px-[10px]'>
              <Slider
                label='나의 주량'
                size='sm'
                color='danger'
                minValue={0}
                maxValue={7}
                getValue={(value) => (value >= 7 ? `7병 이상` : `${value}병`)}
                step={0.5}
                marks={[
                  {
                    value: 0,
                    label: 'X',
                  },
                  {
                    value: 2,
                    label: '조금마심',
                  },
                  {
                    value: 5,
                    label: '술고래',
                  },
                ]}
                onChange={setDrinkLimit}
                value={drinkLimit}
                defaultValue={drinkLimit}
                className='max-w-md'
              />
            </div>
          </div>

          <Divider className='w-[95%]' />

          <div className='w-full flex flex-col gap-[10px] text-start'>
            <span className='text-subtitle text-main-red'>
              종교가 있으신가요?
            </span>
            <RadioGroup
              orientation='horizontal'
              value={religion}
              onValueChange={setReligion}
              color='danger'
              defaultValue='없음'
              classNames={{ wrapper: 'justify-between px-[10px]' }}
            >
              <Radio value='기독교'>기독교</Radio>
              <Radio value='불교'>불교</Radio>
              <Radio value='없음'>없음</Radio>
              <Radio value='기타'>기타</Radio>
            </RadioGroup>
          </div>

          {userGender === 'man' && (
            <>
              <Divider className='w-[95%]' />
              <div className='w-full flex flex-col gap-[10px] text-start'>
                <span className='text-subtitle text-main-red'>
                  군대를 다녀오셨나요?
                </span>
                <div className='w-full flex gap-[10px]'>
                  <button
                    onClick={() => setArmy(true)}
                    className={`flex-1 h-[50px] ${army ? 'focus-btn' : 'btn'}`}
                  >
                    군필
                  </button>
                  <button
                    onClick={() => setArmy(false)}
                    className={`flex-1 h-[50px] ${!army ? 'focus-btn' : 'btn'}`}
                  >
                    미필
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!height || isInvalidHeight}
          className={`absolute bottom-[-80px] w-full left-0 h-[50px] ${!height || isInvalidHeight ? 'btn' : 'full-btn'} content-center cursor-pointer`}
        >
          {isLoading ? '확인중...' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default RegisterEtc;
