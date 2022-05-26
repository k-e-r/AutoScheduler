import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check, Repeat } from 'tabler-icons-react';

import './EditPlan.scss';

import { planDataActions } from '../../store/planData-slice';
import usePlan from '../../hooks/usePlan';

const EditPlan = () => {
  const dispatch = useDispatch();
  const { editPlan } = usePlan();
  const statePlanEditInfo = useSelector((state) => state.planData.planEditInfo);
  const categoryList = useSelector((state) => state.categoryList.categoryList);
  const [mode, setMode] = useState(statePlanEditInfo.mode);
  const [comp, setComp] = useState(statePlanEditInfo.completed);

  const baseId = statePlanEditInfo.baseId;
  const prevMode = statePlanEditInfo.mode;
  const _id = statePlanEditInfo._id;
  const theDay = statePlanEditInfo.date.split('T')[0];
  const desc = statePlanEditInfo.description;
  const category = statePlanEditInfo.category;

  const popupClose = () => {
    dispatch(planDataActions.editPlanInfo({ planEditInfo: '' }));
  };

  const handleOnChange = (e) => {
    if (e.target.id === 'mode') setMode((prev) => !prev);
    else setComp((prev) => !prev);
  };

  return (
    <>
      <div className='editplan__back' onClick={() => popupClose()} />
      <div className='editplan__card'>
        <form onSubmit={editPlan} className='editplan__form'>
          <input type='hidden' name='_id' value={_id} />
          <input type='hidden' name='baseId' value={baseId} />
          <input type='hidden' name='prevMode' value={prevMode} />
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
          <input
            type='text'
            id='description'
            name='description'
            defaultValue={desc}
            required
            autoComplete='off'
          />
          <label htmlFor='category'>Category</label>
          <select id='category' name='category' defaultValue={category}>
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
            <Repeat
              className='editplan__form__icon'
              size={18}
              strokeWidth={4}
              style={{ color: mode ? '#5996ff' : '#d5d5d5' }}
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

export default EditPlan;
