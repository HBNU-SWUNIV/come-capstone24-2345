'use client';

import React, { useEffect, useState } from 'react';
import fetchReport from './fetchReport';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { db } from '@/firebase/firebaseDB';
import { Timestamp } from 'firebase/firestore';

const ReportPage = () => {
  const [reports, setReports] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [currReport, setCurrReport] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchReport();
      setReports(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(reports);
  }, [reports]);

  const checkChatLog = async (report) => {
    try {
      const chatLogs = await axios.post('/api/admin/chat/logs', {
        email: report.email,
        date: report.date,
      });
      setCurrReport(chatLogs.data);
      onOpen();
    } catch (err) {
      alert(err.response.data);
    }
  };

  const getFirebaseTime = (time) => {
    const milliseconds = time.seconds * 1000 + time.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
  };

  if (reports && Array.isArray(reports)) {
    return (
      <div className='w-full flex flex-col gap-[20px] overflow-y-scroll'>
        <span>총 {reports.length}건</span>
        {reports.length !== 0 &&
          reports.map((report) => {
            return (
              <div
                key={report.email + report.date}
                className='w-full flex flex-col gap-[5px] text-info card-border p-[20px] rounded-medium'
              >
                <span>신고자 : {report.email}</span>
                <span className='text-gray-400'>
                  작성일 : {report.date.getFullYear()}-
                  {report.date.getMonth() + 1}-{report.date.getDate()}{' '}
                  {report.date.getHours() < 10
                    ? `0${report.date.getHours()}`
                    : report.date.getHours()}
                  :
                  {report.date.getMinutes() < 10
                    ? `0${report.date.getMinutes()}`
                    : report.date.getMinutes()}
                </span>
                {report.etc !== '' && (
                  <span className='my-[10px]'>{report.etc}</span>
                )}
                <div className='w-full flex flex-wrap gap-[10px] text-info'>
                  {report.options &&
                    report.options.lenght !== 0 &&
                    report.options.map((option) => {
                      return (
                        <div
                          key={report.email + option + report.date}
                          className='py-[3px] text-main-red underline'
                        >
                          #{option}
                        </div>
                      );
                    })}
                </div>
                <button
                  onClick={() => checkChatLog(report)}
                  className='full-btn h-[50px] w-full'
                >
                  채팅 로그 확인
                </button>
              </div>
            );
          })}

        <Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  채팅 로그
                </ModalHeader>
                <ModalBody>
                  <div className='w-full max-h-[350px] flex flex-col gap-[10px] overflow-y-scroll'>
                    {currReport &&
                      currReport.map((item) => {
                        return (
                          <div
                            className='flex flex-col'
                            key={item.email + item.date + item.message}
                          >
                            <span className='text-info text-gray-400'>
                              {item.email}
                            </span>
                            {item.message && (
                              <span className='text-info'>{item.message}</span>
                            )}
                            {item.imgSrc && (
                              <span className='text-info truncate'>
                                {item.imgSrc}
                              </span>
                            )}
                            <span className='text-info text-gray-400'>
                              {getFirebaseTime(item.date)}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    onClick={onClose}
                    className='full-btn px-[15px] py-[5px]'
                  >
                    닫기
                  </button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
};

export default ReportPage;
