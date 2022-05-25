import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './CalendarPlanBox.scss';

const CalendarPlanBox = ({ baseDate, day, showMonth, idx }) => {
  const statePlanInfo = useSelector((state) => state.planInfo.planInfo);
  const [planInfo, setPlanInfo] = useState(statePlanInfo);
  const [calendarPlans, setCalendarPlans] = useState([]);
  const [calendarPlan, setCalendarPlan] = useState([]);

  // {idx: 8, desc: 'test'}
  useEffect(() => {
    if (calendarPlan.length === 0) {
      calendarPlans.map((plan) => {
        if (plan.idx === idx) setCalendarPlan((prev) => [...prev, plan.desc]);
      });
    }
  }, [calendarPlans]);

  useEffect(() => {
    setPlanInfo(statePlanInfo);
  }, [statePlanInfo]);

  useEffect(() => {
    setPlan();
  }, [planInfo]);

  const setPlan = () => {
    planInfo.map((plan) => {
      const checkDay = new Date(plan.date);
      if (baseDate.getMonth() >= checkDay.getMonth()) {
        setCalendarPlans((prev) => [
          ...prev,
          {
            idx: showMonth.findIndex((el) => el === checkDay.getDate()),
            desc: plan.description,
          },
        ]);
      } else {
        setCalendarPlans((prev) => [
          ...prev,
          {
            idx: showMonth.lastIndexOf(checkDay.getDate()),
            desc: plan.description,
          },
        ]);
      }
    });
  };

  const planDetail = () => {
    console.log('click');
  };

  return (
    <div className='planbox__wrapper'>
      {calendarPlan.map((plan, idx) => (
        <p className='planbox__plan' key={idx} onClick={planDetail}>
          {plan}
        </p>
      ))}
      {/* {plan ? (
        <p className='planbox__plan' onClick={() => planDetail(plan)}>
          {plan}
        </p>
      ) : (
        <p className='planbox__plan'>CalendarPlanBox</p>
      )} */}
    </div>
  );
};

export default CalendarPlanBox;
