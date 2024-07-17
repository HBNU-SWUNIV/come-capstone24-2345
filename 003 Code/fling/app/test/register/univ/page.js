'use client';

// import BottomSheet from '@/app/register/univ/BottomSheet';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UnivModal from './UnivModal';
import DepartmentModal from './DepartmentModal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setGlobalDepartment, setGlobalUniv } from '@/lib/store';

const RegisterUniv = () => {
  const [univList, setUnivList] = useState(null);
  const [departmentList, setDepartmentList] = useState(null);
  const [univModalOpen, setUnivModalOpen] = useState(false);
  const [departmentModalOpen, setDepartmentModalOpen] = useState(false);

  const [univ, setUniv] = useState('');
  const [department, setDepartment] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUnivList = async () => {
      await axios('/23년_대학명_및_학과명_리스트.csv').then((result) => {
        let csvFile = result.data;
        let splitRow = csvFile.split('\r\n');
        splitRow.shift();
        splitRow = splitRow.map((element) => {
          return element.split(',');
        });

        const univ_department = {};
        let featuring = splitRow.map((element) => {
          let [univName, , , , department] = element;
          if (!univ_department[univName]) {
            univ_department[univName] = [];
          }
          univ_department[univName].push(department);

          return element[0];
        });

        setUnivList(
          [...new Set(featuring)].sort((a, b) => a.localeCompare(b, 'ko-KR'))
        );
        setDepartmentList(univ_department);
      });
    };

    fetchUnivList();
  }, []);

  const handleNext = async () => {
    await axios
      .post('/api/check/univ', { univ, department })
      .then((result) => {
        dispatch(setGlobalUniv(result.data.univ));
        dispatch(setGlobalDepartment(result.data.department));
        router.push('/test/register/email');
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <div className='w-full h-screen px-[40px] relative'>
      <div className='size-full flex flex-col items-center'>
        <div className='w-full mt-[120px] text-start'>
          <p className='text-title'>대학명과 학과명을</p>
          <p className='text-title'>입력해주세요</p>
        </div>

        <div className='w-full mt-[40px] flex flex-col gap-[20px]'>
          <div className='relative w-full'>
            <input
              placeholder=' '
              disabled
              className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn bg-transparent'
              value={univ}
            />
            <button
              onClick={() => setUnivModalOpen(true)}
              className='absolute top-[20px] right-[20px]'
            >
              <Image
                src='/register/univ/search.svg'
                alt='search'
                width={25}
                height={25}
              />
            </button>
            <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
              대학명
            </label>
          </div>

          <div className='relative w-full'>
            <input
              placeholder=' '
              disabled
              className='floating-label-input block w-full h-[50px] focus:outline-none px-[20px] py-[30px] btn bg-transparent'
              value={department}
            />
            <button
              onClick={() => {
                univ !== ''
                  ? setDepartmentModalOpen(true)
                  : alert('대학교를 선택해주세요');
              }}
              className='absolute top-[20px] right-[20px]'
            >
              <Image
                src='/register/univ/search.svg'
                alt='search'
                width={25}
                height={25}
              />
            </button>
            <label className='floating-label absolute left-[20px] top-[20px] text-gray-500 pointer-events-none transition-all duration-200 ease-in-out'>
              학과명
            </label>
          </div>
        </div>

        {univModalOpen && (
          <UnivModal
            univList={univList}
            setUniv={setUniv}
            setUnivModalOpen={setUnivModalOpen}
          />
        )}

        {departmentModalOpen && (
          <DepartmentModal
            univ={univ}
            departmentList={departmentList[univ]}
            setDepartment={setDepartment}
            setDepartmentModalOpen={setDepartmentModalOpen}
          />
        )}

        <div className='absolute bottom-[50px] w-[calc(100%_-_80px)]'>
          <button
            disabled={univ === '' || department === ''}
            onClick={handleNext}
            className={`w-full h-[60px] my-[20px] ${univ === '' || department === '' ? 'disabled-btn' : 'full-btn'}`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUniv;
