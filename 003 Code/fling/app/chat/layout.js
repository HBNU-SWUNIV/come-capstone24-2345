import Navigator from '../Navigator';

const MainLayout = ({ children }) => {
  return (
    <div className='w-full relative'>
      <header className='max-w-[440px] w-full mx-auto h-[100px] bg-black/50 fixed top-0 z-40'>
        header
      </header>
      <main className='w-full py-[100px]'>{children}</main>
      <nav className='max-w-[440px] w-full mx-auto h-[100px] fixed bottom-0 flex justify-center '>
        <Navigator />
      </nav>
    </div>
  );
};

export default MainLayout;
