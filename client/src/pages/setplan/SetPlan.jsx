import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check } from 'tabler-icons-react';

import './SetPlan.scss';

import { planDataActions } from '../../store/planData-slice';
import usePlan from '../../hooks/usePlan';

const SetPlan = () => {
  const dispatch = useDispatch();
  const { submitPlan } = usePlan();
  const statePlanDateStr = useSelector((state) => state.planData.planDate);
  const [planDate, setPlanDate] = useState(statePlanDateStr);
  const categoryList = useSelector((state) => state.categoryList.categoryList);
  const [mode, setMode] = useState(false);
  const [comp, setComp] = useState(false);
  let theDay = planDate.split('T')[0];

  const popupClose = () => {
    dispatch(planDataActions.setPlanFlg({ planSetFlg: false }));
  };

  const handleOnChange = (e) => {
    if (e.target.id === 'mode') setMode((prev) => !prev);
    else setComp((prev) => !prev);
  };

  return (
    <>
      <div className='plan__back' onClick={() => popupClose()} />
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
          <label htmlFor='mode' className='editplan__form__checkbox'>
            Memorizing
            <input
              type='checkbox'
              id='mode'
              name='mode'
              value='true'
              checked={mode}
              onChange={handleOnChange}
            />
            <Check
              className='editplan__form__icon'
              size={18}
              strokeWidth={4}
              style={{ color: mode ? '#11d442' : '#d5d5d5' }}
            />
          </label>
          <label htmlFor='completed' className='editplan__form__checkbox'>
            Completed
            <input
              type='checkbox'
              id='completed'
              name='completed'
              value='true'
              checked={comp}
              onChange={handleOnChange}
            />
            <Check
              className='editplan__form__icon'
              size={18}
              strokeWidth={4}
              style={{ color: comp ? '#11d442' : '#d5d5d5' }}
            />
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default SetPlan;
