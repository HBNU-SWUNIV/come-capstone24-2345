const MainLayout = ({ children }) => {
  return (
    <div className='w-full bg-yellow-500/20 relative'>
      <header className='max-w-[440px] w-full mx-auto h-[100px] bg-black/50 fixed top-0 z-40'>
        header
      </header>
      <main className='w-full py-[100px]'>{children}</main>
      <nav className='max-w-[440px] w-full mx-auto h-[100px] bg-black/50 fixed bottom-0 z-40'>
        nav
      </nav>
    </div>
  );
};

export default MainLayout;
