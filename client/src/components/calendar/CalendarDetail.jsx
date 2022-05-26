import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Check } from 'tabler-icons-react';

import './CalendarDetail.scss';

const CalendarDetail = () => {
  const statePlanDate = useSelector((state) => state.planDate.planDate);
  const [planDate, setPlanDate] = useState(statePlanDate);
  const [calendarPlan, setCalendarPlan] = useState([]);
  console.log(calendarPlan);

  const statePlanInfo = useSelector((state) => state.planInfo.planInfo);
  const [planInfo, setPlanInfo] = useState(statePlanInfo);

  useEffect(() => {
    setPlanDate(statePlanDate);
  }, [statePlanDate]);

  useEffect(() => {
    setPlanInfo(statePlanInfo);
  }, [statePlanInfo]);

  useEffect(() => {
    checkData();
  }, [planDate]);

  const checkData = () => {
    planInfo.map((plan) => {
      if (plan.date.split('T')[0] === planDate.split('T')[0]) {
        setCalendarPlan((prev) => [
          ...prev,
          {
            plan,
          },
        ]);
      } else console.log('none');
    });
  };

  useEffect(() => {
    setPlanDate(statePlanDate);
    setCalendarPlan([]);
  }, [statePlanDate]);

  const editPlan = () => {
    // dispatch(planDateActions.setPlanFlg({ planSetFlg: true }));
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
        <div className='cal__detail__itemcard' key={idx} onClick={editPlan}>
          <p className='cal__detail__itemcard-id'>{idx + 1}</p>
          <p className='cal__detail__itemcard-desc'>{plan.plan.description}</p>
          <Check
            className='cal__detail__itemcard-icon'
            size={18}
            strokeWidth={4}
            style={{ color: plan.plan.mode ? '#11d442' : '#d5d5d5' }}
          />
          <Check
            className='cal__detail__itemcard-icon'
            size={18}
            strokeWidth={4}
            style={{ color: plan.plan.completed ? '#11d442' : '#d5d5d5' }}
          />
        </div>
      ))}
    </div>
  );
};

export default CalendarDetail;
