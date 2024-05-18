const MainLayout = ({ children }) => {
  return (
    // <div>
    //   <div className='main h-full max-h-[953.67px] flex flex-col'>
    //     <header className='h-[100px] w-full fixed top-0 left-0 right-0 z-50 max-w-[440px] m-auto border-b-2 border-purple-500 border-solid'></header>
    //     <main className='w-full h-auto flex-grow relative'>
    //       <div className='w-full h-full absolute p-[20px]'>{children}</div>
    // <img className='w-full' src='/park.svg'></img>
    //       <nav className='h-[100px] w-full fixed bottom-0 left-0 right-0 z-50 max-w-[440px] m-auto flex justify-center items-center'>
    //         <div className='w-[90%] h-[70%] bg-white rounded-full border-2 border-purple-500 border-solid'>
    //           nav바
    //         </div>
    //       </nav>
    //     </main>
    //   </div>
    // </div>

    // <div className='h-full flex flex-col'>
    //   <header className='h-[100px] w-full z-50 max-w-[440px] m-auto bg-blue-700/40'>
    //     header바
    //   </header>
    //   <main className='w-full h-[calc(100%_-_100px)] flex-grow bg-black/50 flex flex-col items-center overflow-y-scroll pb-[100px]'>
    //     {children}
    //   </main>
    //   <nav className='h-[100px] w-full absolute bottom-0 z-50 max-w-[440px] m-auto'>
    //     nav바
    //   </nav>
    // </div>

    // <div className='h-full flex flex-col'>
    //   <header className='h-[100px] w-full z-50 max-w-[440px] m-auto bg-blue-700/10'>
    //     header바
    //   </header>
    //   <main className='w-full h-[calc(100%_-_100px)] flex-grow bg-yellow-400/40 flex flex-col items-center overflow-y-scroll pb-[100px]'>
    //     {children}
    //   </main>
    //   <nav className='h-[100px] w-full fixed bottom-0 z-50 max-w-[440px] m-auto bg-blue-700/40'>
    //     nav바
    //   </nav>
    // </div>
    <div className='h-full flex flex-col relative'>
      <header className='h-[100px] w-full z-50 max-w-[440px] fixed top-0 m-auto bg-red-700/40'>
        header바
      </header>
      <main className='w-full flex-grow flex flex-col items-center py-[100px] relative'>
        {children}
      </main>
      <nav className='h-[100px] w-full fixed bottom-0 z-50 max-w-[440px] m-auto bg-yellow-700/40'>
        nav바
      </nav>
    </div>
  );
};

export default MainLayout;
