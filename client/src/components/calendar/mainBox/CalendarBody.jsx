import React, { useEffect, useState } from 'react';

import './CalendarBody.scss';

import CalendarDayBox from '../dayBox/CalendarDayBox';
import usePlan from '../../../hooks/usePlan';
import useCategory from '../../../hooks/useCategory';
const dayOfWeekStr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarBody = ({ baseDate, showMonth }) => {
  const { getPlans } = usePlan();
  const { getCategory } = useCategory();
  const [colorIdx, setColorIdx] = useState(new Date().getDate() - 1);

  const changeColorIdx = (idx) => {
    setColorIdx(idx);
  };

  useEffect(() => {
    getPlans({ baseDate, showMonth });
    getCategory();
  }, [baseDate, showMonth]);

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
              changeColorIdx={changeColorIdx}
              colorIdx={colorIdx}
              key={idx + week * 7}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarBody;
