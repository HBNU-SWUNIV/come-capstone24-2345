const MainLayout = ({ children }) => {
  return (
    <div>
      <div className='main h-full flex flex-col'>
        <header className='h-[100px] w-full fixed top-0 left-0 right-0 z-50 max-w-[440px] m-auto bg-indigo-300/20'></header>
        <main className='w-full h-auto flex-grow'>
          <div className='w-full h-full'>{children}</div>
          <nav className='h-[100px] w-full fixed bottom-0 left-0 right-0 z-50 max-w-[440px] m-auto bg-indigo-300/20'></nav>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
