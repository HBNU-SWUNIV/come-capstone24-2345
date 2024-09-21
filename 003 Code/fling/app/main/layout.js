import { getServerSession } from 'next-auth';
import BottomNav from './BottomNav';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login', 'replace');
  }

  return (
    <>
      {/* <header className='w-full h-[100px] max-w-[440px] min-w-[330px] bg-white fixed top-0 left-1/2 transform -translate-x-1/2 text-white z-[9999] flex justify-between items-center px-[30px] py-[25px]'>
        <Image src='/main-logo.svg' alt='main-logo' width={100} height={50} />
        <div className='flex gap-[10px]'></div>
      </header> */}
      {children}
      <BottomNav />
    </>
  );
};

export default Layout;
