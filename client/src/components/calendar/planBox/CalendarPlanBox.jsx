import React from 'react';
import { httpGetPlans } from '../../../hooks/request';

import './CalendarPlanBox.scss';

const CalendarPlanBox = ({ baseDate, showMonth }) => {
  // console.log(baseDate, showMonth);

  // const getPlans = async () => {
  //   const response = await httpGetPlans({
  //     date,
  //     description,
  //     mode,
  //     completed,
  //   });

  //   console.log(response.ok);
  // };

  return (
    <div className='planbox__wrapper'>
      <p>CalendarPlanBox</p>
    </div>
  );
};

export default CalendarPlanBox;
