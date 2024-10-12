import Link from 'next/link';
import React from 'react';

const AdminPage = () => {
  return (
    <div className='w-full flex flex-col gap-[20px]'>
      <Link
        href={'/admin/univCert'}
        className='w-full px-[20px] h-[50px] btn rounded-medium content-center'
      >
        대학인증 관리
      </Link>
      <Link
        href={'/admin/inquiry'}
        className='w-full px-[20px] h-[50px] btn rounded-medium content-center'
      >
        문의내역 관리
      </Link>
      <Link
        href={'/admin/report'}
        className='w-full px-[20px] h-[50px] btn rounded-medium content-center'
      >
        신고내역 관리
      </Link>
    </div>
  );
};

export default AdminPage;
