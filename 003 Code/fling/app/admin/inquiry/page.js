'use client';

import React, { useEffect, useState } from 'react';
import fetchInquiry from './fetchInquiry';
import { Textarea } from '@nextui-org/react';
import submitReply from './submitReply';
import { useRouter } from 'next/navigation';

const InquiryPage = () => {
  const [inquiries, setInquiries] = useState();
  const [replies, setReplies] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInquiry();
        setInquiries(data);
      } catch (err) {
        alert(err);
        router.replace('/admin');
      }
    };
    fetchData();
  }, []);

  const handleReply = (value, inq) => {
    setReplies((prev) => ({
      ...prev,
      [inq.email + inq.date]: value,
    }));
  };

  const handleReplySubmit = async (e, inq) => {
    e.preventDefault();
    const userEmail = inq.email;
    const title = inq.title;
    const date = inq.date;
    const reply = replies[userEmail + date];

    if (reply !== '') {
      try {
        await submitReply(userEmail, title, date, reply);
        setInquiries((prev) => prev.filter((item) => item !== inq));
        setReplies((prev) => ({
          ...prev,
          [inq.email + inq.date]: '',
        }));
      } catch (err) {
        alert(err);
        router.replace('/admin');
      }
    }
  };

  if (inquiries && Array.isArray(inquiries)) {
    return (
      <div className='w-full flex flex-col gap-[20px] overflow-y-scroll'>
        <span>총 {inquiries.length}건</span>
        {inquiries.length !== 0 &&
          inquiries.map((inq) => {
            return (
              <div
                key={inq.email + inq.date}
                className='w-full flex flex-col gap-[5px] card-border py-[10px] px-[20px] rounded-medium'
              >
                <span className='text-subtitle'>{inq.title}</span>
                <span className='text-info text-gray-400'>
                  {inq.email} ({inq.nickname}님)
                </span>
                <span className='text-info text-gray-400'>
                  {inq.date.getFullYear()}-{inq.date.getMonth() + 1}-
                  {inq.date.getDate()}{' '}
                  {inq.date.getHours() < 10
                    ? `0${inq.date.getHours()}`
                    : inq.date.getHours()}
                  :
                  {inq.date.getMinutes() < 10
                    ? `0${inq.date.getMinutes()}`
                    : inq.date.getMinutes()}{' '}
                  작성
                </span>
                <span className='text-info break-keep my-[10px] px-[10px]'>
                  {inq.content}
                </span>
                <form
                  className='w-full flex items-end gap-[10px]'
                  onSubmit={(e) => handleReplySubmit(e, inq)}
                >
                  <Textarea
                    maxRows={2}
                    placeholder='문의사항에 전달할 내용'
                    className='flex-1'
                    value={replies[inq.email + inq.date] || ''}
                    onValueChange={(value) => handleReply(value, inq)}
                    classNames={{
                      inputWrapper: 'bg-white card-border rounded-small',
                    }}
                  />
                  <button
                    type='submit'
                    className='full-btn px-[15px] h-full text-subtitle'
                  >
                    전송
                  </button>
                </form>
              </div>
            );
          })}
        {inquiries.length === 0 && <span>문의 내역이 없습니다</span>}
      </div>
    );
  }
};

export default InquiryPage;
