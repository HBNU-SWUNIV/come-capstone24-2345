'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from '@nextui-org/calendar';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { motion } from 'framer-motion';

const CalendarModal = (props) => {
  let [selectedDate, setSelectedDate] = useState(null);

  const calendarRef = useRef();

  useOnClickOutside(calendarRef, () => {
    props.setOpenModal(false);
  });

  const handleCalendar = (e) => {
    let date = {
      year: e.year.toString(),
      month: e.month.toString().padStart(2, '0'),
      day: e.day.toString().padStart(2, '0'),
    };

    setSelectedDate(date);
  };

  const handleSubmit = () => {
    props.setBirth(selectedDate);
    props.setOpenModal(false);
  };
  return (
    <div
      // className={`w-full h-screen flex flex-col justify-end absolute z-20 transition-transform duration-500 ${props.isOpenModal ? '' : 'translate-y-[100vh]'}`}
      className={`size-full flex flex-col justify-end absolute z-20 bg-black/20`}
    >
      <motion.div
        initial={{ x: 0, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        ref={calendarRef}
        className={`w-full min-h-[440px] h-[50vh] flex flex-col justify-around rounded-t-[30px] p-[40px] bg-white z-30 relative `}
      >
        <Calendar
          className='w-full h-4/5 border-none shadow-none'
          onChange={handleCalendar}
          classNames={{
            // base: 'w-full',
            // prevButton: 'text-main-red',
            // nextButton: 'text-main-red',
            headerWrapper: 'bg-white',
            header: 'bg-transparent text-main-red',
            title: 'bg-transparent text-main-red',
            // gridWrapper: 'bg-white',
            gridHeader: 'w-full',
            gridHeaderRow:
              'size-full px-[0] text-black flex justify-evenly border-black/20 border-solid border-b-1',
            gridHeaderCell: '',
            gridBody: 'bg-white',
            gridBodyRow: 'flex justify-evenly',
            // gridHeader: 'bg-transparent ',
            // cell: 'text-main-red',
            pickerItem: 'text-main-red',
          }}
          aria-label='Date (Show Month and Year Picker)'
          showMonthAndYearPickers
          showShadow={false}
          defaultValue={null}
          color='danger'
        />

        <button
          onClick={handleSubmit}
          className='w-full h-[60px] my-[20px] full-btn'
        >
          확인
        </button>
      </motion.div>
    </div>
  );
};

export default CalendarModal;
