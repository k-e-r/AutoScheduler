import React, { useState, useEffect, useCallback } from 'react';

import './CalendarBody.scss';

import CalendarDayBox from '../dayBox/CalendarDayBox';
import { httpGetPlans } from '../../../hooks/request';

const dayOfWeekStr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarBody = ({ baseDate, showMonth }) => {
  const [plans, setPlans] = useState([]);
  console.log(plans);

  const getPlans = async () => {
    let startDate, endDate;
    if (showMonth[0] !== 1) {
      startDate =
        baseDate.getFullYear() +
        '-' +
        ('0' + baseDate.getMonth()).slice(-2) +
        '-' +
        ('0' + showMonth[0]).slice(-2);
    } else {
      startDate =
        baseDate.getFullYear() +
        '-' +
        ('0' + (baseDate.getMonth() + 1)).slice(-2) +
        '-01';
    }
    if (baseDate.getMonth() === 11) {
      endDate =
        baseDate.getFullYear() +
        1 +
        '-01-' +
        ('0' + showMonth[showMonth.length - 1]).slice(-2);
    } else {
      endDate =
        baseDate.getFullYear() +
        '-' +
        ('0' + (baseDate.getMonth() + 2)).slice(-2) +
        '-' +
        ('0' + showMonth[showMonth.length - 1]).slice(-2);
    }
    const fetchedPlans = await httpGetPlans(startDate, endDate);
    setPlans(fetchedPlans.plan);
  };

  useEffect(() => {
    getPlans();
  }, [baseDate]);

  return (
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
            <CalendarDayBox
              baseDate={baseDate}
              day={showMonth[idx + week * 7]}
              idx={idx + week * 7}
              showMonth={showMonth}
              key={idx + week * 7}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarBody;
