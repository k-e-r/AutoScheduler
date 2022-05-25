import React from 'react';
import { useDispatch } from 'react-redux';

import './CalendarDayBox.scss';

import { planDateActions } from '../../../store/planDate-slice';

const CalendarDayBox = ({ baseDate, day, idx }) => {
  const dispatch = useDispatch();

  const today = new Date().getDate();
  let markFlg = false;
  if (baseDate.getMonth() === new Date().getMonth()) {
    if (baseDate.getFullYear() === new Date().getFullYear()) {
      markFlg = true;
    }
  }

  const addPlan = (baseDate, day, idx) => {
    const setDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), day);
    if (Math.abs(day - idx) > 5) {
      if (idx < 6) {
        dispatch(planDateActions.setPlan(setDate.toString()));
      } else {
        dispatch(planDateActions.setPlan(setDate.toString()));
      }
    } else {
      dispatch(planDateActions.setPlan(setDate.toString()));
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
