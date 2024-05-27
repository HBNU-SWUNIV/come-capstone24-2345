import Navigator from '@/app/Navigator';

const MainLayout = ({ children }) => {
  return (
    <div className='w-full relative'>
      <header className='max-w-[440px] w-full mx-auto h-[100px] bg-black/50 fixed top-0'>
        {/* <Header /> */}
      </header>
      <main className='w-full h-auto py-[100px]'>
        <div className='flex flex-col items-center'>{children}</div>
      </main>
      <nav className='max-w-[440px] w-full mx-auto h-[100px] bg-black/50 fixed bottom-0 flex justify-center items-center'>
        <Navigator />
      </nav>
    </div>
  );
};

export default MainLayout;
