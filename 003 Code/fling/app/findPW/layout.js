const MainLayout = ({ children }) => {
  return (
    <div className='h-full flex flex-col'>
      <header className='h-[100px] w-full z-50 max-w-[440px] m-auto bg-red-700/40'>
        header바
      </header>
      <main className='w-full h-full flex-grow flex flex-col items-center overflow-y-scroll pb-[100px]'>
        {children}
      </main>
      {/* <nav className='h-[100px] w-full fixed bottom-0 z-50 max-w-[440px] m-auto bg-yellow-700/40'>
        nav바
      </nav> */}
    </div>
  );
};

export default MainLayout;
