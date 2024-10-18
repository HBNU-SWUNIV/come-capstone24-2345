import './reset.css';
import './globals.css';
import './slider.css';
import localfont from 'next/font/local';
import { NextUIProviders } from '../library/NextUIProviders';
import ReduxProvider from '../library/ReduxProvider';
import StyledComponentsRegistry from '../library/StyledComponentRegistry';
import SessionAuthProvider from '@/library/SessionAuthProvider';

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
    icon: '/icons/icon.png',
  },
  manifest: '/manifest.json',
  keywords: ['대학', '소개팅', '랜덤 소개팅', '랜덤'],
  appleTouchStartupImage: [
    {
      src: '/icons/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png',
      media:
        '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      src: '/icons/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png',
      media:
        '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      src: '/icons/splash_screens/Phone_11__iPhone_XR_portrait.png',
      media:
        '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      src: '/icons/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png',
      media:
        '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      src: '/icons/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png',
      media:
        '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      src: '/icons/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png',
      media:
        '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      src: '/icons/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png',
      media:
        '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      src: '/icons/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png',
      media:
        '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      src: '/icons/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png',
      media:
        '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      src: '/icons/splash_screens/iPhone_16_Pro_Max_portrait.png',
      media:
        '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      src: '/icons/splash_screens/iPhone_16_Pro_portrait.png',
      media:
        '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
  ],

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
            <ReduxProvider>
              <SessionAuthProvider>
                <NextUIProviders>
                  <StyledComponentsRegistry>
                    {children}
                  </StyledComponentsRegistry>
                </NextUIProviders>
              </SessionAuthProvider>
            </ReduxProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
