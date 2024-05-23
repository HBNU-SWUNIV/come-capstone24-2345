import Navigator from '@/app/Navigator';

const ChatLayout = ({ children }) => {
  return (
    <div className='w-full relative'>
      <header className='max-w-[440px] w-full mx-auto h-[60px] bg-[#f6ebfe] px-[20px] fixed top-0 flex items-center'>
        <div className='h-[50%] flex items-center'>
          <img className='h-[80%] aspect-square' src='/logo.png' />
          <span className='text-2xl ml-[8px]'>플링</span>
        </div>
      </header>
      {/* <main className='w-full py-[100px]'>{children}</main>
      <nav className='max-w-[440px] w-full mx-auto h-[100px] fixed bottom-0 flex justify-center '>
        <Navigator />
      </nav> */}

      <main className='w-full h-auto pt-[60px] pb-[120px] px-[20px]'>
        <div className='w-full flex flex-col items-center'>{children}</div>
      </main>
      <nav className='max-w-[440px] w-full mx-auto h-[100px] fixed bottom-0 flex justify-center '>
        <Navigator />
      </nav>
    </div>
  );
};

export default ChatLayout;
