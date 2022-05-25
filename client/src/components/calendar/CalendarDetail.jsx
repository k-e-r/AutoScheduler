import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './CalendarDetail.scss';

const CalendarDetail = () => {
  const statePlanDate = useSelector((state) => state.planDate.planDate);
  const [planDate, setPlanDate] = useState(statePlanDate);

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
        console.log(plan);
      } else console.log('none');
    });
  };

  return (
    <div className='cal__detail__wrapper'>
      <div className='cal__detail__card'>Plan Detail</div>
    </div>
  );
};

export default CalendarDetail;
