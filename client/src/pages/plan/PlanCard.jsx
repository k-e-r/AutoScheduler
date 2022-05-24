import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './PlanCard.scss';

const PlanCard = () => {
  const statePlanDateStr = useSelector((state) => state.planDate.planDate);
  const [planDate, setPlanDate] = useState(statePlanDateStr);
  let statePlanDate = new Date(planDate);

  useEffect(() => {
    setPlanDate(() => {
      statePlanDate = new Date(statePlanDateStr);
      return statePlanDateStr;
    });
  }, [statePlanDateStr]);

  return (
    <div className='plan__card'>
      {statePlanDate.getFullYear()} {statePlanDate.getMonth() + 1}{' '}
      {statePlanDate.getDate()}
    </div>
  );
};

export default PlanCard;
