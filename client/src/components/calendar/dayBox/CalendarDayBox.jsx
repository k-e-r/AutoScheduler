import React from 'react';
import { useDispatch } from 'react-redux';
import { planDateActions } from '../../../store/planDate-slice';

import './CalendarDayBox.scss';

import CalendarPlanBox from '../planBox/CalendarPlanBox';

const CalendarDayBox = ({ baseDate, day, idx, showMonth }) => {
  const dispatch = useDispatch();

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
        if (baseDate.getMonth() === 0) {
          const setDate = new Date(baseDate.getFullYear() - 1, 12, day);
          dispatch(planDateActions.setPlan(setDate.toString()));
        } else {
          const setDate = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() - 1,
            day
          );
          dispatch(planDateActions.setPlan(setDate.toString()));
        }
      } else {
        if (baseDate.getMonth() === 11) {
          const setDate = new Date(baseDate.getFullYear() + 1, 1, day);
          dispatch(planDateActions.setPlan(setDate.toString()));
        } else {
          const setDate = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + 1,
            day
          );
          dispatch(planDateActions.setPlan(setDate.toString()));
        }
      }
    } else {
      const setDate = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        day
      );
      dispatch(planDateActions.setPlan(setDate.toString()));
    }
  };

  return (
    <div
      className='weekly__datebody'
      onClick={() => addPlan(baseDate, day, idx)}
    >
      <p
        className={`weekly__dateTitle ${
          Math.abs(day - idx) > 5 ? 'dayGrey ' : ''
        } ${day === today && markFlg ? 'today' : ''}`}
      >
        {day}
      </p>
      <CalendarPlanBox
        baseDate={baseDate}
        day={day}
        showMonth={showMonth}
        idx={idx}
      />
    </div>
  );
};

export default CalendarDayBox;
