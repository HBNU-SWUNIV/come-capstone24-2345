import { useEffect, useState } from 'react';

const Modal = (props) => {
  let [content, setContent] = useState(null);
  const clickClose = () => {
    props.handleModal(false);
  };

  useEffect(() => {
    setContent(props.content);
  }, [props]);

  return (
    <div className='size-full max-w-[440px] bg-black/60 fixed top-0 flex justify-center items-center z-50'>
      <div className='w-[90%] h-[65%] card relative flex flex-col items-center card rounded-[20px] p-[20px]'>
        <img
          className='w-[35px] h-[35px] absolute top-[-40px] right-0 cursor-pointer'
          src='/close.svg'
          onClick={clickClose}
        />
        {/* <div className='size-full p-[20px] flex flex-col items-center card rounded-[20px]'> */}
        <span className='mb-[20px]'>{content?.title}</span>
        {content ? (
          <img src={`/${content.img}.svg`} className='w-[25%]' />
        ) : null}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Modal;
