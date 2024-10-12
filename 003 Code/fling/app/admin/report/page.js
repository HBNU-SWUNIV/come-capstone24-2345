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

  const checkChatLog = (report) => {
    setCurrReport(report);
    onOpen();
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
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={onClose}>
                    Close
                  </Button>
                  <Button color='primary' onPress={onClose}>
                    Action
                  </Button>
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
