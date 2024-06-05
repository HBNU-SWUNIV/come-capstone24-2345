import Image from 'next/image';

import mbtiI from '/public/mbti/I.svg';
import mbtiE from '/public/mbti/E.svg';
import mbtiS from '/public/mbti/S.svg';
import mbtiN from '/public/mbti/N.svg';
import mbtiF from '/public/mbti/F.svg';
import mbtiT from '/public/mbti/T.svg';
import mbtiP from '/public/mbti/P.svg';
import mbtiJ from '/public/mbti/J.svg';

import { useRouter } from 'next/navigation';
import Slider from './Slider';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ChatTrue = () => {
  let [mbti, setMbti] = useState([null, null, null, null]);
  const session = useSession();
  const user = session && session.data?.user;

  // useEffect(() => {
  //   const fetchMbti = () => {
  //     let copy = [...mbti];
  //     user &&
  //       user.mbti.map(async (element, index) => {
  //         let mbtiImg = await import(`/public/mbti/${element}.svg`);
  //         copy[index] = mbtiImg;
  //       });
  //     setMbti(copy);
  //   };
  //   fetchMbti();
  // }, []);

  const router = useRouter();
  return (
    <div className='w-full h-[calc(100%_+_100px)]'>
      <div className='card p-[20px] text-start rounded-[20px]'>
        <span className='mr-[8px]'>{user && user.gender ? '👨🏻‍🎓' : '👩🏻‍🎓'}</span>
        <span>{user && user.nickname} 님의 프로필</span>
        <div className='w-full flex justify-between my-[20px]'>
          <div className='w-[47%] aspect-square bg-[#FF006B] rounded-[20px]'></div>
          <div className='w-[47%] flex flex-col justify-between'>
            <div className='w-full card flex items-center px-[20px] py-[14px] rounded-[20px]'>
              <span className='w-[45%]' style={{ fontSize: '12px' }}>
                키
              </span>
              <span
                className='w-[50%] pl-[8px] border-l border-black/20 border-solid'
                style={{ fontSize: '13px' }}
              >
                {user && user.height}cm
              </span>
            </div>
            <div className='w-full card flex items-center px-[20px] py-[14px] rounded-[20px]'>
              <span className='w-[45%]' style={{ fontSize: '12px' }}>
                주량
              </span>
              <span
                className='w-[50%] pl-[8px] border-l border-black/20 border-solid'
                style={{ fontSize: '13px' }}
              >
                {user && user.drinkLimit}병
              </span>
            </div>
            <div className='w-full card flex items-center px-[20px] py-[14px] rounded-[20px]'>
              <span className='w-[45%]' style={{ fontSize: '12px' }}>
                흡연여부
              </span>
              <span
                className='w-[50%] pl-[8px] border-l border-black/20 border-solid'
                style={{ fontSize: '13px' }}
              >
                {user && user.smoking ? '흡연' : '비흡연'}
              </span>
            </div>
          </div>
        </div>

        <span>{user && user.nickname} 님의 MBTI</span>
        <div className='w-full h-auto flex justify-between my-[20px]'>
          {/* {user &&
            user.mbti.map((element, index) => {
              return (
                <Image
                  className='w-[10%] aspect-square box-content p-[20px] card rounded-[20px]'
                  // src={mbti[index]}
                  fill
                  src={`/public/mbti/${element}.svg`}
                  sizes='10%, 10%'
                  alt={`mbti-${element}`}
                />
              );
            })} */}
          {/* <Image
            className='w-[10%] aspect-square box-content p-[20px] card rounded-[20px]'
            src={mbtiI}
            alt='mbti-I'
          />
          <Image
            className='w-[10%] aspect-square box-content p-[20px] card rounded-[20px]'
            src={mbtiS}
            alt='mbti-S'
          />
          <Image
            className='w-[10%] aspect-square box-content p-[20px] card rounded-[20px]'
            src={mbtiF}
            alt='mbti-F'
          />
          <Image
            className='w-[10%] aspect-square box-content p-[20px] card rounded-[20px]'
            src={mbtiP}
            alt='mbti-P'
          /> */}
        </div>

        <span>{user && user.nickname} 님의 취미</span>
        {/* <div className='w-[calc(100%_+_20px)] p-[20px] overflow-x-scroll translate-x-[-20px]'>
          <div className='flex w-min animate-[rollingBanner_10s_linear_infinite]'>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>🎱 당구</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>🎳 볼링</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>🎾 테니스</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>🏂 보드</span>
            </div>
            <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
              <span>🎱 당구</span>
            </div>
          </div>
        </div> */}
        <Slider texts={user && user.hobby} />

        {/* <div className='w-full'>
          <marquee direction={`left`} className='p-[20px] scroll-smooth'>
            <div className='flex w-min'>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>🎱 당구</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>🎳 볼링</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>🎾 테니스</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>🏂 보드</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>🎱 당구</span>
              </div>
            </div>
          </marquee>
        </div> */}

        <span>{user && user.nickname} 님의 성격</span>
        {/* <div className='w-[calc(100%_+_20px)] p-[20px] overflow-x-scroll translate-x-[-20px]'>
          <marquee direction={`right`}>
            <div className='flex w-min'>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>활동적인</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>적극적인</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>대담한</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>유머러스한</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>능률적인</span>
              </div>
            </div>
          </marquee>
        </div> */}

        <Slider
          texts={['활동적인', '적극적인', '대담한', '유머러스한', '능률적인']}
        />
        {/* <div className='w-full'>
          <marquee direction={`right`} className='p-[20px]'>
            <div className='flex w-min'>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>활동적인</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>적극적인</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>대담한</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>유머러스한</span>
              </div>
              <div className='w-max card p-[20px] mr-[8px] rounded-[20px]'>
                <span>능률적인</span>
              </div>
            </div>
          </marquee>
        </div> */}

        <div className='w-full flex flex-col items-center mb-[20px]'>
          <div className='my-[20px]'>
            <span>{user && user.nickname}님과 </span>
            <span>70.89</span>
            <span>% 일치</span>
          </div>
          <button
            className='w-[50%] btn p-[20px] rounded-full'
            onClick={() => {
              router.push('/chat/room/123');
            }}
          >
            채팅방 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTrue;
