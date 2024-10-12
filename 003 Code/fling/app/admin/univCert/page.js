'use client';

import React, { useEffect, useState } from 'react';
import fetchUserInfo from './fetchUserInfo';
import handleCert from './handleCert';
import { Button } from '@nextui-org/react';
import Image from 'next/image';

const UnivCertPage = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await fetchUserInfo();
        setUsers(userData);
      } catch (err) {
        setUsers(err);
      }
    };
    fetchUsers();
  }, []);

  const handleCertButton = async (isAllow, email) => {
    try {
      await handleCert(isAllow, email);
    } catch (err) {
      alert(err);
    }
  };

  if (users && Array.isArray(users)) {
    return (
      <div className='w-full flex flex-col gap-[20px] overflow-y-scroll'>
        <span>총 {users.length}건</span>
        {users.map((user) => {
          return (
            <div
              className='w-full h-fit flex flex-col gap-[10px] card-border rounded-medium text-info p-[15px]'
              key={user.email}
            >
              <div className='w-full flex gap-[10px]'>
                <div className='flex-1 flex flex-col justify-center gap-[10px]'>
                  <span>
                    {user.univ} {user.department} ({user.gender})
                  </span>
                  <span>{user.email}</span>
                  <span>이름 : {user.name}</span>
                  <span>
                    생일 : {user.birth.year}.{user.birth.month}.{user.birth.day}
                  </span>
                  <span>대학인증 : {user.univCert ? 'Y' : 'N'}</span>
                </div>
                <div className='w-full aspect-square relative bg-gray-100 rounded-small p-[5px]'>
                  <Image
                    src={user.profileImg}
                    fill
                    alt={'profile-' + user.name}
                    placeholder='blur'
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=='
                    className='rounded-small object-contain'
                  />
                </div>
              </div>
              <div className='w-full flex gap-[10px]'>
                <Button
                  size='md'
                  color='primary'
                  className='flex-1'
                  onClick={() => handleCertButton(true, user.email)}
                >
                  승인
                </Button>
                <Button
                  size='md'
                  color='danger'
                  className='flex-1'
                  onClick={() => handleCertButton(false, user.email)}
                >
                  거절
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>{users}</div>;
  }
};

export default UnivCertPage;
