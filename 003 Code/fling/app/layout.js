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
          <div className='main flex flex-col h-screen'>
            <div className='box-content w-full h-[100px]'>
              {/* border-solid border-2 border-black */}
              {/* <div>헤더임</div> */}
            </div>
            <div className='mx-[20px] flex-grow flex'>
              <div className='w-full'>{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
