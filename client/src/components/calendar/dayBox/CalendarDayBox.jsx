import React from 'react';

import './CalendarDayBox.scss';

const CalendarDayBox = ({ baseDate, day, idx }) => {
  const today = new Date().getDate();
  let markFlg = false;
  if (baseDate.getMonth() === new Date().getMonth()) {
    if (baseDate.getFullYear() === new Date().getFullYear()) {
      markFlg = true;
    }
  }

  const addPlan = (baseDate, day, idx) => {
    if (Math.abs(day - idx) > 5) {
      if (idx < 6) {
        console.log(baseDate.getFullYear(), baseDate.getMonth(), day);
      } else {
        console.log(baseDate.getFullYear(), baseDate.getMonth() + 2, day);
      }
    } else {
      console.log(baseDate.getFullYear(), baseDate.getMonth() + 1, day);
    }
  };

  return (
    <div
      className='weekly__datebody'
      onClick={() => addPlan(baseDate, day, idx)}
    >
      <p
        className={`${Math.abs(day - idx) > 5 ? 'dayGrey ' : ''} ${
          day === today && markFlg ? 'today' : ''
        }`}
      >
        {day}
      </p>
    </div>
  );
};

export default CalendarDayBox;
