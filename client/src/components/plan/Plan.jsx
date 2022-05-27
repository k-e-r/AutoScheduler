import React from 'react';
import { useDispatch } from 'react-redux';
import { planDataActions } from '../../store/planData-slice';
import { Check, Trash, Repeat } from 'tabler-icons-react';

import usePlan from '../../hooks/usePlan';

import './Plan.scss';

function Plan({ plan, idx }) {
  const dispatch = useDispatch();
  const { deletePlan } = usePlan();
  let clickCount = 0;

  const editPlan = (plan) => {
    dispatch(planDataActions.editPlanInfo({ planEditInfo: plan }));
    dispatch(planDataActions.setPlanFlg({ planSetFlg: true }));
  };

  const handleSingleOrDoubleClick = () => {
    clickCount++;

    if (clickCount < 2) {
      setTimeout(() => {
        if (clickCount > 1) {
          const id = plan._id;
          deletePlan({ id });
        }
        clickCount = 0;
      }, 200);
    }
  };

  return (
    <div className='cal__detail__itemcard-wrap' key={idx}>
      <div onClick={() => editPlan(plan)} className='cal__detail__itemcard'>
        <p className='cal__detail__itemcard-id'>{idx + 1}</p>
        <p className='cal__detail__itemcard-desc'>{plan.description}</p>
        <Repeat
          className='cal__detail__itemcard-icon'
          style={{ color: plan.mode ? '#5996ff' : '#d5d5d5' }}
        />
        <Check
          className='cal__detail__itemcard-icon'
          style={{ color: plan.completed ? '#11d442' : '#d5d5d5' }}
        />
      </div>
      <Trash
        className='cal__detail__itemcard-iconDelete'
        onClick={() => handleSingleOrDoubleClick()}
      />
    </div>
  );
}

export default Plan;
