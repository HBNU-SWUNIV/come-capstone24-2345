const MainLayout = ({ children }) => {
  return (
    <div className='w-full bg-yellow-500/20 relative'>
      <header className='max-w-[440px] w-full mx-auto h-[100px] bg-black/50 fixed top-0'>
        header
      </header>
      <main className='w-full h-auto py-[100px]'>
        <div className='flex flex-col items-center'>{children}</div>
      </main>
      {/* <nav className='max-w-[440px] w-full mx-auto h-[100px] bg-black/50 fixed bottom-0'>
        nav
      </nav> */}
    </div>
  );
};

export default MainLayout;
