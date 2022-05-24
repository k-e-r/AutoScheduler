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
  return (
    <div className='weekly__datebody'>
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
