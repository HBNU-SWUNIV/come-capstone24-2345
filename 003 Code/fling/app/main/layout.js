import Image from 'next/image';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
  return (
    <>
      <header className='w-full h-[100px] max-w-[440px] min-w-[330px] bg-white fixed top-0 left-1/2 transform -translate-x-1/2 text-white z-[9999] flex justify-between items-center px-[30px] py-[25px]'>
        <Image src='/main-logo.svg' alt='main-logo' width={100} height={50} />
        <div className='flex gap-[10px]'></div>
      </header>
      {children}
      <BottomNav />
    </>
  );
};

export default Layout;
