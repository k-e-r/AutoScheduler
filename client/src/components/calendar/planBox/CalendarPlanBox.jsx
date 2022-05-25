import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './CalendarPlanBox.scss';

const CalendarPlanBox = ({ baseDate, showMonth, idx }) => {
  const statePlanInfo = useSelector((state) => state.planInfo.planInfo);
  const [planInfo, setPlanInfo] = useState(statePlanInfo);
  const [calendarPlans, setCalendarPlans] = useState([]);
  const [calendarPlan, setCalendarPlan] = useState([]);
  const categoryList = useSelector((state) => state.categoryList.categoryList);
  const stateCategoryColor = useSelector(
    (state) => state.categoryList.categoryColorList
  );
  const [categoryColor, setCategoryColor] = useState(stateCategoryColor);

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
            const color =
              categoryColor[
                categoryList.findIndex((el) => el === plan.category)
              ];
            return [
              ...prev,
              {
                _id: plan._id,
                category: color,
                desc: plan.desc,
              },
            ];
          }
        });
    });
  }, [calendarPlans]);

  useEffect(() => {
    setPlanInfo(statePlanInfo);
    setCategoryColor(stateCategoryColor);
    setCalendarPlan([]);
    setCalendarPlans([]);
  }, [statePlanInfo, stateCategoryColor]);

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
            category: plan.category,
            desc: plan.description,
          },
        ]);
      } else {
        setCalendarPlans((prev) => [
          ...prev,
          {
            _id: plan._id,
            idx: showMonth.lastIndexOf(checkDay.getDate()),
            category: plan.category,
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
        <div className='planbox__plan-wrapper' key={idx}>
          <span style={{ backgroundColor: plan.category }}></span>
          <p className='planbox__plan' onClick={planDetail}>
            {plan.desc}
          </p>
        </div>
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
