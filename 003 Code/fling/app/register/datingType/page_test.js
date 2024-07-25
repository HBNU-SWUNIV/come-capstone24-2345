'use client';

import { setGlobalPersonality } from '@/library/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const RegisterPersonality = () => {
  let personalityList = ['활동적인', '적극적인', '대담한'];
  let [personality, setPersonality] = useState([]);
  let [etcPersonality, setEtcPersonality] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sendData = etcPersonality
      ? { personality: [...personality, ...etcPersonality] }
      : { personality };
    await axios
      .post('/api/check/hobby', sendData)
      .then((result) => {
        dispatch(setGlobalPersonality(result.data.personality));
        router.push('/register/etc');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handleClickPersonality = (e) => {
    console.log(e.target.dataset.personality);
    let copy = [...personality];
    if (copy.includes(e.target.dataset.personality)) {
      e.target.classList.remove('btn');
      e.target.classList.add('card');
      let filteredCopy = copy.filter(
        (element) => element != e.target.dataset.personality
      );
      setPersonality(filteredCopy);
    } else {
      e.target.classList.remove('card');
      e.target.classList.add('btn');
      copy.push(e.target.dataset.personality);
      setPersonality(copy);
    }
  };

  const handleEtcPersonality = (e) => {
    if (e.target.value != '') {
      let etc = e.target.value.split(' ').join('').split(',');
      setEtcPersonality(etc);
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
          회원님의 성격을 선택해 주세요
        </span>

        <div className='w-full flex justify-center flex-wrap mb-[20px]'>
          {personalityList.map((element) => {
            return (
              <span
                key={element}
                onClick={handleClickPersonality}
                className='m-[8px] py-[10px] px-[20px] card rounded-full cursor-pointer'
                data-personality={element}
              >
                {element}
              </span>
            );
          })}
        </div>

        <span className='text-start mb-[20px]' style={{ fontSize: '20px' }}>
          이외의 성격이 있다면 적어주세요
        </span>

        <input
          onChange={handleEtcPersonality}
          className='w-full card p-[20px] mb-[20px] rounded-[20px]'
          placeholder='지적인, 활동적인, ...'
        />

        <button type='submit' className='btn p-[20px] rounded-full mb-[40px]'>
          다음
        </button>
      </form>
    </>
  );
};

export default RegisterPersonality;
