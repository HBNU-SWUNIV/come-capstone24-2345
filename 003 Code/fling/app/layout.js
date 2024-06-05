import './reset.css';
import './globals.css';
import './login.css';
import './slider.css';
import 'react-datepicker/dist/react-datepicker.css';
import localfont from 'next/font/local';

const hanbit = localfont({
  src: '../public/fonts/KCC-Hanbit.woff2',
  weight: 'normal',
});

export const metadata = {
  title: '플링',
  description: '터치 단 한 번으로 랜덤 소개팅',
  icons: {
    icon: 'icons/pwa-icons/icon-512x512.png',
  },
  appleWebApp: {
    title: '플링',
    statusBarStyle: 'black',
    // '#FBF6FF',
    // '#F6EBFE',
    startupImage: [
      '/assets/startup/apple-touch-startup-image-768x1004.png',
      {
        url: '/assets/startup/apple-touch-startup-image-1536x2008.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className={hanbit.className}>
        <div className='w-screen h-screen flex'>
          {/* max-h-[940px] */}
          <div className='main w-full max-w-[440px] min-w-[330px] min-h-[568px] text-center m-auto box-border flex flex-col h-screen overflow-x-hidden'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
