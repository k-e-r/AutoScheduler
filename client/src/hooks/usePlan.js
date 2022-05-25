import { useSelector, useDispatch } from 'react-redux';
import { httpSubmitPlan, httpGetPlans } from './request';
import { planInfoActions } from '../store/planInfo-slice';
import { planDateActions } from '../store/planDate-slice';

const usePlan = () => {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.searchDate.startDate);
  const endDate = useSelector((state) => state.searchDate.endDate);

  const submitPlan = async (e) => {
    e.preventDefault();
    const timeOffset = new Date().getTimezoneOffset() / 60;
    const data = new FormData(e.target);
    const prevDate = new Date(data.get('plan-date'));
    const date = prevDate.setHours(prevDate.getHours() + timeOffset);
    const description = data.get('description');
    const category = data.get('category');
    const mode = data.get('mode') === null ? false : data.get('mode');
    const completed =
      data.get('completed') === null ? false : data.get('completed');
    const response = await httpSubmitPlan({
      date,
      description,
      category,
      mode,
      completed,
    });

    const success = response.ok;
    if (success) {
      const fetchedPlans = await httpGetPlans(startDate, endDate);
      dispatch(planInfoActions.setPlanInfo(fetchedPlans.plan));
    }
    dispatch(planDateActions.setPlan(''));
  };

  return {
    submitPlan,
  };
};

export default usePlan;
