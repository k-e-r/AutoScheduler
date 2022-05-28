import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check, Repeat } from 'tabler-icons-react';

import './PlanPopup.scss';

import { planDataActions } from '../../store/planData-slice';
import usePlan from '../../hooks/usePlan';
import { useEffect } from 'react';

const PlanPopup = ({ planInfo }) => {
  const dispatch = useDispatch();
  // const planInfo = useSelector((state) => state.planData.planEditInfo);
  const planSetFlg = useSelector((state) => state.planData.planSetFlg);
  const { editPlan, submitPlan } = usePlan();
  const categoryList = useSelector((state) => state.categoryList.categoryList);
  const statePlanDate = useSelector((state) => state.planData.planDate);

  // edit
  const statePlanEditInfo = useSelector((state) => state.planData.planEditInfo);
  const [planEditInfo, setPlanEditInfo] = useState(statePlanEditInfo);
  const [mode, setMode] = useState(
    planEditInfo.mode ? planEditInfo.mode : false
  );
  const [comp, setComp] = useState(
    planEditInfo.completed ? planEditInfo.completed : false
  );

  console.log(planEditInfo);
  console.log(statePlanDate, planEditInfo.date);

  useEffect(() => {
    setPlanEditInfo(statePlanEditInfo);
  }, [statePlanEditInfo]);

  const baseId = planEditInfo.baseId;
  const prevMode = planEditInfo.mode;
  const _id = planEditInfo._id;
  const theDay =
    planInfo === ''
      ? statePlanDate?.split('T')[0]
      : planEditInfo?.date.split('T')[0];
  const desc = planEditInfo.description;
  const category = planEditInfo.category;

  const popupClose = () => {
    dispatch(planDataActions.editPlanInfo({ planEditInfo: '' }));
    dispatch(planDataActions.setPlanFlg({ planSetFlg: false }));
  };

  const handleOnChange = (e) => {
    if (e.target.id === 'mode') setMode((prev) => !prev);
    else setComp((prev) => !prev);
  };

  return (
    <>
      {planSetFlg && (
        <>
          <div className='plan__back' onClick={() => popupClose()} />
          <div className='plan__card'>
            <form
              onSubmit={planInfo === '' ? submitPlan : editPlan}
              className='plan__form'
            >
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
              <select
                id='category'
                name='category'
                defaultValue={planInfo === '' ? categoryList[0] : category}
              >
                {categoryList.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
              <label htmlFor='mode' className='plan__form__checkbox'>
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
                  className='plan__form__icon'
                  style={{ color: mode ? '#5996ff' : '#d5d5d5' }}
                />
              </label>
              <label htmlFor='completed' className='plan__form__checkbox'>
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
                  className='plan__form__icon'
                  style={{ color: comp ? '#11d442' : '#d5d5d5' }}
                />
              </label>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default PlanPopup;
