import React from 'react';
import { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'tabler-icons-react';
import './CalendarMain.scss';

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

const dayOfWeekStr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarMain = () => {
  const [baseDate, setBaseDate] = useState(new Date(2022, 5 - 1, 1));
  const showMonth = [];
  const endOfMonth = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth() + 1,
    0
  );
  baseDate.setDate(1);
  const prevMonth = new Date(baseDate.getFullYear(), baseDate.getMonth(), 0);
  if (baseDate.getDay() !== 0) {
    [...Array(baseDate.getDay())].map((x, idx) => {
      showMonth.push(prevMonth.getDate() - (baseDate.getDay() - idx - 1));
    });
  }
  [...Array(endOfMonth.getDate())].map((x, idx) => {
    showMonth.push(idx + 1);
  });
  [...Array(42 - showMonth.length)].map((x, idx) => {
    showMonth.push(idx + 1);
  });
  // console.log('showMonth', showMonth);

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
        <button onClick={changePrevMonth}>
          <ChevronLeft
            size={25}
            strokeWidth={1.2}
            className='calendar__chevron'
          />
        </button>
        <div className='calendar__month' onClick={changeToday}>
          {monthsStr[baseDate.getMonth()]} {baseDate.getFullYear()}
        </div>
        <button onClick={changeNextMonth}>
          <ChevronRight
            size={25}
            strokeWidth={1.2}
            className='calendar__chevron'
          />
        </button>
      </div>
      <div className='calendar__body'>
        <div className='weekly__header'>
          {[...Array(7)].map((x, idx) => (
            <p className='weekly__dayBody' key={idx}>
              {dayOfWeekStr[idx]}
            </p>
          ))}
        </div>
        {[...Array(6)].map((x, week) => (
          <div className='weekly__body' key={week}>
            {[...Array(7)].map((x, idx) => (
              <div className='weekly__datebody' key={idx + week * 7}>
                <p>{showMonth[idx + week * 7]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarMain;
