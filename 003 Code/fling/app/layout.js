import './reset.css';
import './globals.css';
import './login.css';
import './slider.css';
import 'react-datepicker/dist/react-datepicker.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import localfont from 'next/font/local';
import { NextUIProviders } from '../lib/NextUIProviders';
import StyledComponentsRegistry from '@/lib/StyledComponentRegistry';

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
    statusBarStyle: 'white',
    startupImage: [
      '/assets/startup/apple-touch-startup-image-768x1004.png',
      {
        url: '/assets/startup/apple-touch-startup-image-1536x2008.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className={hanbit.className}>
        <div className='w-screen h-screen flex bg-black/20'>
          {/* max-h-[940px] */}
          <div className='main w-full max-w-[440px] min-w-[330px] min-h-[568px] text-center m-auto box-border flex flex-col h-screen overflow-x-hidden bg-white'>
            <NextUIProviders>
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </NextUIProviders>
          </div>
        </div>
      </body>
    </html>
  );
}
