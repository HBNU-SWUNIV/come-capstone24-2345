import './reset.css';
import './globals.css';
import './login.css';
import './slider.css';
import localfont from 'next/font/local';
import { NextUIProviders } from '../library/NextUIProviders';
import StyledComponentsRegistry from '../library/StyledComponentRegistry';

const Pretendard = localfont({
  src: [
    {
      path: '../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const metadata = {
  title: '플링',
  description: '터치 단 한 번으로 랜덤 소개팅',
  icons: {
    icon: 'icons/pwa-icons/icon-512x512.png',
  },
  keywords: ['대학', '소개팅', '랜덤 소개팅', '랜덤'],
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
  other: {
    'mobile-web-app-capable': 'yes',
  },
  // openGraph: {
  //   title: '플링',
  //   description: '터치 단 한 번으로 랜덤 소개팅',
  //   // url: 'https://nextjs.org',
  //   siteName: '플링',
  //   images: [
  //     {
  //       // url: 'https://nextjs.org/og.png', // Must be an absolute URL
  //       width: 800,
  //       height: 600,
  //     },
  //     {
  //       // url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
  //       width: 1800,
  //       height: 1600,
  //       alt: 'My custom alt',
  //     },
  //   ],
  //   locale: 'ko_KR',
  //   type: 'website',
  // },
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
      <body className={Pretendard.className}>
        <div className='w-screen h-screen flex bg-black/10'>
          {/* max-h-[940px] */}
          <div className='main w-full max-w-[440px] min-w-[330px] min-h-[568px] text-center m-auto box-border flex flex-col h-screen overflow-x-hidden bg-white relative'>
            <NextUIProviders>
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </NextUIProviders>
          </div>
        </div>
      </body>
    </html>
  );
}
