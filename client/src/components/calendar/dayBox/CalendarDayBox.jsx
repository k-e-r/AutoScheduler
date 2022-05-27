import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { planDataActions } from '../../../store/planData-slice';

import './CalendarDayBox.scss';

import CalendarPlanBox from '../planBox/CalendarPlanBox';

const CalendarDayBox = ({
  baseDate,
  day,
  idx,
  showMonth,
  changeColorIdx,
  colorIdx,
}) => {
  const dispatch = useDispatch();
  let clickCount = 0;

  const today = new Date().getDate();
  let markFlg = false;

  useEffect(() => {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    dispatch(planDataActions.setPlanDate({ planDate: date.toISOString() }));
  }, []);

  if (baseDate.getMonth() === new Date().getMonth()) {
    if (baseDate.getFullYear() === new Date().getFullYear()) {
      markFlg = true;
    }
  }

  const setPlanDate = () => {
    let setDate;
    if (Math.abs(day - idx) > 5) {
      if (idx < 6) {
        if (baseDate.getMonth() === 0) {
          setDate = new Date(baseDate.getFullYear() - 1, 12, day);
        } else {
          setDate = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() - 1,
            day
          );
        }
      } else {
        if (baseDate.getMonth() === 11) {
          setDate = new Date(baseDate.getFullYear() + 1, 1, day);
        } else {
          setDate = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + 1,
            day
          );
        }
      }
    } else {
      setDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), day);
    }
    dispatch(planDataActions.setPlanDate({ planDate: setDate.toISOString() }));
    changeColorIdx(idx);
  };

  const addPlan = () => {
    dispatch(planDataActions.setPlanFlg({ planSetFlg: true }));
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
      style={{ backgroundColor: colorIdx === idx && 'rgb(255, 248, 225)' }}
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
