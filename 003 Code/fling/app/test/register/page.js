import Image from 'next/image';
import Link from 'next/link';

const Register = () => {
  return (
    <div className='w-full h-screen px-[40px]'>
      <div className='size-full flex flex-col justify-center items-center relative'>
        <div className='w-full absolute top-[120px] text-start'>
          <span className='text-title'>회원가입</span>
          <div className='text-subtitle my-[10px] opacity-70'>
            <p>본인인증을 위해</p>
            <p>회원님의 학교이메일 계정과</p>
            <p>학생증 사진이 필요해요</p>
          </div>
        </div>

        <div className='w-full max-h-[400px] flex justify-center items-center'>
          <Image
            className='object-contain'
            width={200}
            height={200}
            src={'/register/email-auth.svg'}
            alt='email-auth'
          />
        </div>

        <div className='w-full absolute bottom-[50px]'>
          <Link
            href={'/test/register/gender'}
            className='flex justify-center items-center w-full h-[60px] my-[20px] full-btn'
          >
            <p>시작하기</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
