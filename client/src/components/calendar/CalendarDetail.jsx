import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Plan from '../plan/Plan';

import './CalendarDetail.scss';

const CalendarDetail = () => {
  const statePlanDate = useSelector((state) => state.planData.planDate);
  const [planDate, setPlanDate] = useState(statePlanDate);
  const [calendarPlan, setCalendarPlan] = useState([]);

  const statePlanInfo = useSelector((state) => state.planData.planInfo);
  const [planInfo, setPlanInfo] = useState(statePlanInfo);

  useEffect(() => {
    setPlanInfo(statePlanInfo);
    setPlanDate(statePlanDate);
    setCalendarPlan([]);
  }, [statePlanInfo, statePlanDate]);

  useEffect(() => {
    checkData();
  }, [planInfo, planDate]);

  const checkData = () => {
    planInfo.map((plan) => {
      if (plan.date.split('T')[0] === planDate.split('T')[0]) {
        setCalendarPlan((prev) => [
          ...prev,
          {
            plan,
          },
        ]);
      }
    });
  };

  return (
    <div className='cal__detail__wrapper'>
      <div className='cal__detail__card'>Plan Detail</div>

      <div className='cal__detail__itemcard-title'>
        <p className='cal__detail__itemcard-id'>No.</p>
        <p className='cal__detail__itemcard-desc'>Description</p>
        <p className='cal__detail__itemcard-memorize'>Memorize</p>
        <p className='cal__detail__itemcard-completed'>Completed</p>
      </div>
      {calendarPlan.map((plan, idx) => (
        <Plan plan={plan.plan} idx={idx} key={idx} />
      ))}
    </div>
  );
};

export default CalendarDetail;
