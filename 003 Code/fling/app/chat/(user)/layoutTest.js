const MainLayout = ({ children }) => {
  return (
    <div>
      <div className='main h-full max-h-[953.67px] flex flex-col'>
        <header className='h-[100px] w-full fixed top-0 left-0 right-0 z-50 max-w-[440px] m-auto border-b-2 border-purple-500 border-solid'></header>
        <main className='w-full  h-full flex-grow relative'>
          {/* h-[calc(100vh_-_100px)] */}
          <div className='w-full h-full p-[20px] bg-black/50'>{children}</div>
          {/* <img className='w-full' src='/park.svg'></img> */}
          <nav className='h-[100px] w-full fixed bottom-0 left-0 right-0 z-50 max-w-[440px] m-auto flex justify-center items-center'>
            <div className='w-[90%] h-[70%] bg-white rounded-full border-2 border-purple-500 border-solid'>
              nav바
            </div>
          </nav>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
