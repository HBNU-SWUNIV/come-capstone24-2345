import { Inter } from 'next/font/google';
import './globals.css';
import './reset.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '플링',
  description: '터치 단 한 번으로 랜덤 소개팅',
  icons: {
    icon: 'icons/pwa-icons/icon-512x512.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {/* <body className={inter.className}> */}
      <body>
        <div className='w-screen h-screen bg-[#ffffff]'>
          <div className='main flex flex-col h-screen pt-[100px] overflow-x-hidden'>
            {/* <header className='h-[100px] max-w-[440px] left-0 right-0 m-auto z-50 fixed bg-indigo-300'>
              헤더임
            </header>
            <div className='px-[20px] mt-[100px] flex-grow flex'>
              <div className='w-full z-10'>{children}</div>
            </div>
            <nav className='h-[80px] max-w-[440px] bottom-0 left-0 right-0 m-auto z-50 fixed bg-indigo-100'>
              nav바임
            </nav> */}
            {children}
          </div>
          {/* <div className='main h-full max-h-[953.67px] flex flex-col'>
            <header className='h-[100px] w-full fixed top-0 left-0 right-0 z-50 max-w-[440px] m-auto bg-indigo-300/20'></header>
            <main className='mt-[100px] w-full h-auto flex-grow relative'>
              <div className='w-full h-full absolute p-[20px]'>{children}</div>
              <img className='w-full' src='/park.svg'></img>
              <nav className='h-[100px] w-full fixed bottom-0 left-0 right-0 z-50 max-w-[440px] m-auto bg-indigo-300/20'></nav>
            </main>
          </div> */}
        </div>
      </body>
    </html>
  );
}
