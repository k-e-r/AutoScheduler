import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check, Trash } from 'tabler-icons-react';
import { planDataActions } from '../../store/planData-slice';

import './CalendarDetail.scss';

const CalendarDetail = () => {
  const dispatch = useDispatch();
  const statePlanDate = useSelector((state) => state.planData.planDate);
  const [planDate, setPlanDate] = useState(statePlanDate);
  const [calendarPlan, setCalendarPlan] = useState([]);

  const statePlanInfo = useSelector((state) => state.planData.planInfo);
  const [planInfo, setPlanInfo] = useState(statePlanInfo);
  let clickCount = 0;

  useEffect(() => {
    setPlanInfo(statePlanInfo);
    setPlanDate(statePlanDate);
    setCalendarPlan([]);
  }, [statePlanInfo, statePlanDate]);

  useEffect(() => {
    checkData();
  }, [planInfo, planDate]);

  const checkData = () => {
    planInfo.map((plan) => {
      if (plan.date.split('T')[0] === planDate.split('T')[0]) {
        setCalendarPlan((prev) => [
          ...prev,
          {
            plan,
          },
        ]);
      }
    });
  };

  const editPlan = (plan) => {
    dispatch(planDataActions.editPlanInfo({ planEditInfo: plan }));
  };

  const handleSingleOrDoubleClick = () => {
    clickCount++;

    if (clickCount < 2) {
      setTimeout(() => {
        if (clickCount > 1) {
          console.log('double');
          // if (mode) addCategory({ id, category, color });
          // if (!mode) deleteCategory({ id, category });
        }
        clickCount = 0;
      }, 200);
    }
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
        <div className='cal__detail__itemcard-wrap' key={idx}>
          <div
            onClick={() => editPlan(plan.plan)}
            className='cal__detail__itemcard'
          >
            <p className='cal__detail__itemcard-id'>{idx + 1}</p>
            <p className='cal__detail__itemcard-desc'>
              {plan.plan.description}
            </p>
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
          <Trash
            className='cal__detail__itemcard-iconDelete'
            size={25}
            strokeWidth={1.7}
            onClick={() => handleSingleOrDoubleClick()}
          />
        </div>
      ))}
    </div>
  );
};

export default CalendarDetail;
