import React from 'react';

import './CalendarDayBox.scss';

const CalendarDayBox = ({ day, idx }) => {
  const today = new Date().getDate();
  return (
    <div className='weekly__datebody'>
      <p
        className={`${Math.abs(day - idx) > 5 ? 'dayGrey ' : ''} ${
          day === today ? 'today' : ''
        }`}
      >
        {day}
      </p>
    </div>
  );
};

export default CalendarDayBox;
