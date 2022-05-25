import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './PlanCard.scss';

import { planDateActions } from '../../store/planDate-slice';
import usePlan from '../../hooks/usePlan';

const PlanCard = () => {
  const { submitPlan } = usePlan();
  const dispatch = useDispatch();
  const statePlanDateStr = useSelector((state) => state.planDate.planDate);
  const [planDate, setPlanDate] = useState(statePlanDateStr);
  let statePlanDate = new Date(planDate);
  let theDay = statePlanDate.toISOString().split('T')[0];

  useEffect(() => {
    setPlanDate(() => {
      statePlanDate = new Date(statePlanDateStr);
      theDay = statePlanDate.toISOString().split('T')[0];
      console.log('theDay', theDay);
      return statePlanDateStr;
    });
  }, [statePlanDateStr]);

  const popupClose = () => {
    dispatch(planDateActions.setPlan(''));
  };

  return (
    <>
      <div className='plan__back' onClick={popupClose} />
      <div className='plan__card'>
        <form onSubmit={submitPlan} className='plan__form'>
          <label htmlFor='plan-date'>Set Date</label>
          <input
            type='date'
            id='plan-date'
            name='plan-date'
            min={theDay}
            max='2040-12-31'
            defaultValue={theDay}
            required
          />
          <label htmlFor='description'>Description</label>
          <input type='text' id='description' name='description' required />
          <label htmlFor='mode'>Memorizing</label>
          <input type='checkbox' id='mode' name='mode' value='true' />
          <label htmlFor='completed'>Completed</label>
          <input type='checkbox' id='completed' name='completed' value='true' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default PlanCard;
