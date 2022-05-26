import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './SetPlan.scss';

import { planDataActions } from '../../store/planData-slice';
import usePlan from '../../hooks/usePlan';

const SetPlan = () => {
  const { submitPlan } = usePlan();
  const dispatch = useDispatch();
  const statePlanDateStr = useSelector((state) => state.planData.planDate);
  const [planDate, setPlanDate] = useState(statePlanDateStr);
  const categoryList = useSelector((state) => state.categoryList.categoryList);
  let theDay = planDate.split('T')[0];

  useEffect(() => {
    setPlanDate(() => {
      theDay = statePlanDateStr.split('T')[0];
      return statePlanDateStr;
    });
  }, [statePlanDateStr]);

  const popupClose = () => {
    dispatch(planDataActions.setPlanFlg({ planSetFlg: false }));
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
          <label htmlFor='category'>Category</label>
          <select id='category' name='category' defaultValue={categoryList[0]}>
            {categoryList.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
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

export default SetPlan;
