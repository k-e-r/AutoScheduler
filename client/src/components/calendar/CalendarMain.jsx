import React from 'react';

import { ChevronLeft, ChevronRight } from 'tabler-icons-react';
import './CalendarMain.scss';

const CalendarMain = () => {
  const showMonth = [];
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
  const today = new Date(2022, 5 - 1, 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  today.setDate(1);
  const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  if (today.getDay() !== 0) {
    [...Array(today.getDay())].map((x, idx) => {
      showMonth.push(prevMonth.getDate() - (today.getDay() - idx - 1));
    });
  }
  [...Array(endOfMonth.getDate())].map((x, idx) => {
    showMonth.push(idx + 1);
  });
  [...Array(42 - showMonth.length)].map((x, idx) => {
    showMonth.push(idx + 1);
  });
  console.log('showMonth', showMonth);

  return (
    <div className='calendar__card'>
      <div className='calendar__header'>
        <button>
          <ChevronLeft
            size={25}
            strokeWidth={1.2}
            className='calendar__chevron'
          />
        </button>
        <div className='calendar__month'>{monthsStr[today.getMonth()]}</div>
        <button>
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
