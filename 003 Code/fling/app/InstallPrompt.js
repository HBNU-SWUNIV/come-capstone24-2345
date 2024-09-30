import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { easeInOut } from 'framer-motion';
import Image from 'next/image';
import useOnClickOutside from '../hooks/useOnClickOutside';

const InstallPrompt = (props) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(null);

  const modalRef = useRef();

  useOnClickOutside(modalRef, () => {
    props.setIsClickInstallBtn(false);
  });

  useEffect(() => {
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    setIsIOS(isDeviceIOS);

    isDeviceIOS && props.setIsClickInstallBtn(true);

    const beforeInstallPromptHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      props.setIsClickInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        alert('홈 화면에 설치되었습니다!');
      } else {
        props.setIsClickInstallBtn(false);
      }
      setDeferredPrompt(null);
      props.setIsClickInstallBtn(false);
    }
  };

  if (!props.isClickInstallBtn) {
    return null;
  }

  return (
    <div className='absolute w-full h-screen top-0 left-0 bg-black/50 z-[9999] p-[20px]'>
      <motion.div
        initial={{ x: 0, y: -120, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={easeInOut}
        ref={modalRef}
        className='w-full bg-white rounded-[15px] flex flex-col justify-center items-center gap-[5px] p-[20px]'
      >
        {isIOS ? (
          <>
            <p className='text-subtitle'>
              Fling은 앱에서 원활하게 사용하실 수 있습니다
            </p>
            <div className='text-start text-info w-full flex flex-col gap-[5px]'>
              <div className='flex gap-[5px]'>
                <p>1.</p>
                <Image
                  src='/install/share.svg'
                  width={20}
                  height={20}
                  alt='shared-button'
                />
                <p>공유버튼 클릭</p>
              </div>
              <div className='flex gap-[5px]'>
                <p>2.</p>
                <Image
                  src='/install/plus-box.svg'
                  width={20}
                  height={20}
                  alt='plus-button'
                />
                <p>"홈 화면에 추가하기" 클릭</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className='text-subtitle'>
              Fling은 앱에서 원활하게 사용하실 수 있습니다
            </p>
            <button
              className='full-btn px-[20px] h-[40px]'
              onClick={handleInstallClick}
            >
              홈 화면에 추가하기
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default InstallPrompt;
