import React from 'react';
import { useDispatch } from 'react-redux';
import { planDateActions } from '../../../store/planDate-slice';

import './CalendarDayBox.scss';

import CalendarPlanBox from '../planBox/CalendarPlanBox';

const CalendarDayBox = ({ baseDate, day, idx, showMonth }) => {
  const dispatch = useDispatch();
  let clickCount = 0;

  const today = new Date().getDate();
  let markFlg = false;
  if (baseDate.getMonth() === new Date().getMonth()) {
    if (baseDate.getFullYear() === new Date().getFullYear()) {
      markFlg = true;
    }
  }

  const setPlanDate = () => {
    if (Math.abs(day - idx) > 5) {
      if (idx < 6) {
        if (baseDate.getMonth() === 0) {
          const setDate = new Date(baseDate.getFullYear() - 1, 12, day);
          dispatch(planDateActions.setPlan({ planDate: setDate.toString() }));
        } else {
          const setDate = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() - 1,
            day
          );
          dispatch(planDateActions.setPlan({ planDate: setDate.toString() }));
        }
      } else {
        if (baseDate.getMonth() === 11) {
          const setDate = new Date(baseDate.getFullYear() + 1, 1, day);
          dispatch(planDateActions.setPlan({ planDate: setDate.toString() }));
        } else {
          const setDate = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + 1,
            day
          );
          dispatch(planDateActions.setPlan({ planDate: setDate.toString() }));
        }
      }
    } else {
      const setDate = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        day
      );
      dispatch(planDateActions.setPlan({ planDate: setDate.toString() }));
    }
  };

  const addPlan = () => {
    dispatch(planDateActions.setPlanFlg({ planSetFlg: true }));
  };

  const handleSingleOrDoubleClick = (e) => {
    clickCount++;

    if (clickCount < 2) {
      setTimeout(() => {
        setPlanDate();
        if (clickCount > 1) {
          console.log('Double click');
          addPlan();
        } else {
          console.log('Single click');
        }
        clickCount = 0;
      }, 200);
    }
  };

  return (
    <div
      className='weekly__datebody'
      onClick={(e) => handleSingleOrDoubleClick(e)}
    >
      <p
        className={`weekly__dateTitle ${
          Math.abs(day - idx) > 5 ? 'dayGrey ' : ''
        } ${day === today && markFlg ? 'today' : ''}`}
      >
        {day}
      </p>
      <CalendarPlanBox baseDate={baseDate} showMonth={showMonth} idx={idx} />
    </div>
  );
};

export default CalendarDayBox;
