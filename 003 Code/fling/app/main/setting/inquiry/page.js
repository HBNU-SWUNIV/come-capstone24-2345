'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Divider } from '@nextui-org/react';

const InquiryPage = () => {
  const [email, setEmail] = useState();
  const [inquiryList, setInquiryList] = useState();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      setEmail(session.user.email);
    }
  }, [session, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post('/api/setting/fetch/inquiry', {
          email,
        });
        setInquiryList(result.data);
      } catch (err) {
        alert(err.response.data);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  return (
    <div className='w-full h-dvh px-[40px] pt-[80px] flex flex-col gap-[10px] text-start bg-gray-50'>
      <div className='flex justify-between items-center'>
        <span>회원님의 문의내역</span>
        <Image
          src='/main/mypage/close.svg'
          width={25}
          height={25}
          alt='close'
          className='cursor-pointer'
          onClick={() => {
            router.replace('/main/setting/');
          }}
        />
      </div>
      {inquiryList ? (
        inquiryList && inquiryList.length !== 0 ? (
          inquiryList.map((inq) => {
            const writeDate = new Date(inq.date);
            const replyDate = inq.reply.date && new Date(inq.reply.date);
            return (
              <div
                key={inq.title + inq.date}
                className='flex flex-col gap-[10px] card-border w-full px-[20px] py-[10px] rounded-medium bg-white'
              >
                <div className='flex flex-col gap-[2px]'>
                  <span className='text-info text-gray-500 w-full flex justify-end'>
                    {writeDate.getFullYear()}-{writeDate.getMonth() + 1}-
                    {writeDate.getDate()}{' '}
                    {writeDate.getHours() < 10
                      ? `0${writeDate.getHours()}`
                      : writeDate.getHours()}
                    :
                    {writeDate.getMinutes() < 10
                      ? `0${writeDate.getMinutes()}`
                      : writeDate.getMinutes()}
                  </span>
                  <span className='break-keep'>{inq.title}</span>
                </div>
                <span className='text-subtitle break-keep'>{inq.content}</span>
                <Divider className='my-[5px]' />
                <span className='text-info break-keep pl-[20px]'>
                  {inq.reply.content
                    ? inq.reply.content
                    : '답변이 달리지 않았습니다'}
                </span>
                <span className='text-info text-gray-500 pl-[20px]'>
                  {replyDate
                    ? `작성일자:${replyDate.getFullYear()}-${replyDate.getMonth() + 1}-${replyDate.getDate()}${' '}
                ${
                  replyDate.getHours() < 10
                    ? `0${replyDate.getHours()}`
                    : replyDate.getHours()
                }:${
                  replyDate.getMinutes() < 10
                    ? `0${replyDate.getMinutes()}`
                    : replyDate.getMinutes()
                }`
                    : '--'}
                </span>
              </div>
            );
          })
        ) : (
          <span className='text-info text-gray-500'>
            문의하신 내역이 없습니다
          </span>
        )
      ) : (
        <span className='text-info text-gray-500'>
          문의내역을 불러오는 중입니다...
        </span>
      )}
    </div>
  );
};

export default InquiryPage;
