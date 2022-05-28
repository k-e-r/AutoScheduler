import { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'tabler-icons-react';
import './CalendarMain.scss';
import CalendarBody from './mainBox/CalendarBody';

const monthsStr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CalendarMain = () => {
  const [baseDate, setBaseDate] = useState(new Date());
  const showMonth = [];
  const endOfMonth = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth() + 1,
    0
  );
  baseDate.setDate(1);
  const prevMonth = new Date(baseDate.getFullYear(), baseDate.getMonth(), 0);
  // prev month
  if (baseDate.getDay() !== 0) {
    [...Array(baseDate.getDay())].map((x, idx) => {
      showMonth.push(prevMonth.getDate() - (baseDate.getDay() - idx - 1));
    });
  }
  // this month
  [...Array(endOfMonth.getDate())].map((x, idx) => {
    showMonth.push(idx + 1);
  });
  // next month
  [...Array(42 - showMonth.length)].map((x, idx) => {
    showMonth.push(idx + 1);
  });

  const changePrevMonth = () => {
    setBaseDate((prev) => {
      if (prev.getMonth() === 0) {
        return new Date(prev.getFullYear() - 1, 12 - 1, 1);
      } else {
        return new Date(prev.getFullYear(), baseDate.getMonth() - 1, 1);
      }
    });
  };

  const changeNextMonth = () => {
    setBaseDate((prev) => {
      if (prev.getMonth() === 12) {
        return new Date(prev.getFullYear() + 1, 1 - 1, 1);
      } else {
        return new Date(prev.getFullYear(), baseDate.getMonth() + 1, 1);
      }
    });
  };

  const changeToday = () => {
    setBaseDate(new Date());
  };

  return (
    <div className='calendar__card'>
      <div className='calendar__header'>
        <button onClick={() => changePrevMonth()}>
          <ChevronLeft className='calendar__chevron' />
        </button>
        <div className='calendar__month' onClick={() => changeToday()}>
          {monthsStr[baseDate.getMonth()]} {baseDate.getFullYear()}
        </div>
        <button onClick={() => changeNextMonth()}>
          <ChevronRight className='calendar__chevron' />
        </button>
      </div>
      <CalendarBody baseDate={baseDate} showMonth={showMonth} />
    </div>
  );
};

export default CalendarMain;
