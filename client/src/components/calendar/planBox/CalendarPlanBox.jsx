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
    calendarPlans.map((plan) => {
      if (plan.idx === idx)
        setCalendarPlan((prev) => {
          const flg = prev?.map((el) => {
            if (el._id === plan._id) return false;
          });
          if (flg.includes(false)) {
            return [...prev];
          } else {
            return [
              ...prev,
              {
                _id: plan._id,
                desc: plan.desc,
              },
            ];
          }
        });
    });
  }, [calendarPlans]);

  useEffect(() => {
    setPlanInfo(statePlanInfo);
    setCalendarPlan([]);
    setCalendarPlans([]);
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
            _id: plan._id,
            idx: showMonth.findIndex((el) => el === checkDay.getDate()),
            desc: plan.description,
          },
        ]);
      } else {
        setCalendarPlans((prev) => [
          ...prev,
          {
            _id: plan._id,
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
          {plan.desc}
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
