import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './PlanCard.scss';

import { planDateActions } from '../../store/planDate-slice';

const PlanCard = () => {
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

  const planSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(
      new Date(data.get('plan-date')),
      data.get('description'),
      data.get('mode'),
      data.get('completed')
    );
  };

  return (
    <>
      <div className='plan__back' onClick={popupClose} />
      <div className='plan__card'>
        <form onSubmit={planSubmit} className='plan__form'>
          <label htmlFor='plan-date'>Set Date</label>
          <input
            type='date'
            id='plan-date'
            name='plan-date'
            min={theDay}
            max='2040-12-31'
            defaultValue={theDay}
          />
          <label htmlFor='description'>Description</label>
          <input type='text' id='description' name='description' />
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
