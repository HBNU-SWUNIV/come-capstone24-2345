const Modal = (props) => {
  const clickHandler = (e) => {
    // alert('모달창 닫기');
    props.closeModal(e);
  };
  return (
    // w-[250px] h-[250px]
    // top-[-25px] left-[-20px]
    <div className='size-full flex justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute z-10'>
      <div className='w-[120%] h-[110%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black/35 absolute z-10 flex justify-center'></div>

      <div className='w-[90%] h-[60vh] min-h-[380px] translate-y-[10%] z-20 card relative'>
        <button
          className='absolute top-[-10%] right-[0%]'
          onClick={() => {
            clickHandler(false);
          }}
        >
          <img className='w-[35px] h-[35px]' src='/close.svg' />
        </button>
        {props.content}
      </div>
    </div>
  );
};

export default Modal;
