'use client';
import { useState } from 'react';
import Calendar from '@/assets/icons/calendar.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './style.module.css';

const DateInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();

  const handleDateChange = (e: Date | null) => {
    setSelectedDate(e);
  };

  return (
    <>
      <div className={styles['calendar-wrapper']}>
        <Calendar className='text-gray-500 text-lg' />
        <DatePicker
          placeholderText='Due date'
          selected={selectedDate}
          onChange={(date) => handleDateChange(date)}
        />
      </div>
    </>
  );
};

export default DateInput;
