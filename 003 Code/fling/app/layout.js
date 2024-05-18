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
        <div className='w-screen h-screen min-w-[330px] bg-blue-500/30'>
          <div className='main max-w-[440px] text-center m-auto box-border flex flex-col h-screen overflow-x-hidden'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
