import Navigator from '../Navigator';

const MainLayout = ({ children }) => {
  return (
    <div className='w-full relative'>
      <div className='w-full h-[90px] flex items-center border-b border-solid border-white/50 px-[20px]'>
        <div className='h-[50%] flex items-center'>
          <img className='h-[80%] aspect-square' src='/logo.png' />
          <span className='text-2xl ml-[8px]'>플링</span>
        </div>
      </div>

      {/* <header className='max-w-[440px] w-full mx-auto h-[100px] bg-[#f6ebfe] flex items-center'>
        <div className='w-[15%] h-[50%] flex items-center justify-center'>
          <img
            className='h-[70%] aspect-square cursor-pointer'
            src='/direction/chevron-left.svg'
          />
        </div>

        <div className='w-[70%] h-[50%] flex items-center justify-center'>
          <img className='h-[80%] aspect-square' src='/logo.png' />
          <span className='text-xl ml-[8px]'>플링</span>
        </div>

        <div className='w-[15%] h-[50%] flex items-center'></div>
      </header> */}

      {/* <header className='max-w-[440px] w-full mx-auto h-[100px] bg-black/50 fixed top-0'></header> */}
      <main className='w-full h-auto pb-[100px]'>
        <div className='flex flex-col items-center'>{children}</div>
      </main>
      <nav className='max-w-[440px] w-full mx-auto h-[100px] fixed bottom-0 flex justify-center '>
        <Navigator />
      </nav>
    </div>
  );
};

export default MainLayout;
