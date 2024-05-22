'use client';

import { useState } from 'react';
import Fifth from './FifthRegister';
import First from './FirstRegister';
import Fourth from './FourthRegister';
import Last from './LastRegister';
import Second from './SecondRegister';
import Third from './ThirdRegister';

const Register = () => {
  let [page, setPage] = useState(1);

  const result = () => {
    switch (page) {
      case 1:
        return <First handlePage={handlePage} page={page} />;
      case 2:
        return <Second handlePage={handlePage} page={page} />;
      case 3:
        return <Third handlePage={handlePage} page={page} />;
      case 4:
        return <Fourth handlePage={handlePage} page={page} />;
      case 5:
        return <Fifth handlePage={handlePage} page={page} />;
      case 6:
        return <Last handlePage={handlePage} page={page} />;
      default:
        return <First handlePage={handlePage} page={page} />;
    }
  };

  const handlePage = (pages) => {
    setPage(pages);
  };
  return (
    <>
      {/* <div className='size-full pb-[100px] bg-indigo-600/30 overflow-y-scroll'> */}
      {result()}
    </>
  );
};

export default Register;
