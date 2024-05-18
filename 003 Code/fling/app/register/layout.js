// const MainLayout = ({ children }) => {
//   return (
//     <div>
//       <div className='main h-full flex flex-col'>
//         <header className='h-[100px] w-full fixed top-0 left-0 right-0 z-50 max-w-[440px] m-auto bg-indigo-300/20'></header>
//         <main className='w-full h-[calc(100vh_-_100px)] flex-grow p-[20px] bg-black/30'>
//           <div className='w-full h-full'>{children}</div>
//           <nav className='h-[100px] w-full fixed bottom-0 left-0 right-0 z-50 max-w-[440px] m-auto bg-indigo-300/20'></nav>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

const RegisterLayout = ({ children }) => {
  return (
    <div className='h-full flex flex-col'>
      <header className='h-[100px] w-full z-50 max-w-[440px] m-auto bg-blue-700/40'>
        header바
      </header>
      <main className='w-full h-[calc(100%_-_200px)] flex-grow flex flex-col items-center overflow-y-scroll px-[20px] pb-[100px]'>
        {children}
      </main>
      {/* <nav className='h-[100px] w-full fixed bottom-0 z-50 max-w-[440px] m-auto bg-blue-700/40'>
        nav바
      </nav> */}
    </div>
  );
};

export default RegisterLayout;
