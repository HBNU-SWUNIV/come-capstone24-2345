'use client';

import Fifth from './FifthRegister';
import First from './FirstRegister';
import Fourth from './FourthRegister';
import Last from './LastRegister';
import Second from './SecondRegister';
import Third from './ThirdRegister';

const Register = () => {
  return (
    <div className='size-full pb-[100px] bg-indigo-600/30 overflow-y-scroll'>
      {/* <First /> */}
      {/* <Second /> */}
      {/* <Third /> */}
      {/* <Fourth /> */}
      {/* <Fifth /> */}
      <Last />
    </div>
  );
};

export default Register;
