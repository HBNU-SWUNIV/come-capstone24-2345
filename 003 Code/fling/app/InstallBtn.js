// 'use client';

// import { useEffect, useRef, useState } from 'react';

// const InstallBtn = () => {
//   //   const [deferredPrompt, setDeferredPrompt] = useState(null);

//   //   useEffect(() => {
//   //     const handler = (e) => {
//   //       console.log('beforeinstallprompt event fired');
//   //       e.preventDefault();
//   //       setDeferredPrompt(e);
//   //     };
//   //     window.addEventListener('beforeinstallprompt', handler);

//   //     return () => window.removeEventListener('beforeinstallprompt', handler);
//   //   }, []);

//   //   const handleInstallClick = () => {
//   //     if (deferredPrompt) {
//   //       deferredPrompt.prompt();
//   //       deferredPrompt.userChoice.then((choiceResult) => {
//   //         if (choiceResult.outcome === 'accepted') {
//   //           console.log('User accepted the install prompt');
//   //         } else {
//   //           console.log('User dismissed the install prompt');
//   //         }
//   //         setDeferredPrompt(null);
//   //       });
//   //     }
//   //   };

//   let deferredPrompt = useRef(null);

//   useEffect(() => {
//     console.log('Listening for Install prompt');
//     window.addEventListener('beforeinstallprompt', (e) => {
//       e.preventDefault();
//       deferredPrompt.current = e;
//     });

//     //설치가 되어있다면 버튼은 숨긴다
//     if (!deferredPrompt.current) {
//       return dispatch({
//         type: 'HIDE_BUTTON',
//       });
//     }

//     //버튼을 보여줌
//     dispatch({
//       type: 'SHOW_BUTTON',
//     });
//   }, []);

//   const installApp = () => {
//     if (!deferredPrompt.current) return false;

//     //홈화면의 추가를 실행시킨다
//     deferredPrompt.current.prompt();

//     //실행 후 유저가 설치를 했는지 안했는지를 알 수 있다
//     deferredPrompt.current.userChoice.then((choiceResult) => {
//       //설치 했을 때
//       if (choiceResult.outcome === 'accepted') {
//         console.log('User accepted the A2HS prompt');
//         dispatch({
//           type: 'HIDE_BUTTON',
//         });
//       } else {
//         //설치 하지 않았을 때
//         console.log('User dismissed the A2HS prompt');
//       }
//     });
//   };

//   return (
//     // <button
//     //   className='size-[50px]'
//     //   onClick={handleInstallClick}
//     //   style={{ display: deferredPrompt ? 'block' : 'none' }}
//     // >
//     //   Install PWA
//     // </button>
//     <button onClick={installApp}>다운로드</button>
//   );
// };

// export default InstallBtn;
