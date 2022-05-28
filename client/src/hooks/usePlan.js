import { useSelector, useDispatch } from 'react-redux';
import {
  httpGetPlans,
  httpSubmitPlan,
  httpEditPlan,
  httpDeletePlan,
  httpSearchDeletePlan,
} from './requestPlan';
import { planDataActions } from '../store/planData-slice';
import usePlanFunc from './usePlanFunc';
let startDate;
let endDate;

const usePlan = () => {
  const dispatch = useDispatch();
  const { repeatSetPlan } = usePlanFunc();
  const userId = useSelector((state) => state.auth.userId);

  const getPlans = async ({ baseDate, showMonth }) => {
    if (showMonth[0] !== 1) {
      // prevMonth
      if (baseDate.getMonth() === 0) {
        // Jan
        startDate =
          baseDate.getFullYear() - 1 + '-12-' + ('0' + showMonth[0]).slice(-2);
      } else {
        // !Jan
        startDate =
          baseDate.getFullYear() +
          '-' +
          ('0' + baseDate.getMonth()).slice(-2) +
          '-' +
          ('0' + showMonth[0]).slice(-2);
      }
    } else {
      // this month
      startDate =
        baseDate.getFullYear() +
        '-' +
        ('0' + (baseDate.getMonth() + 1)).slice(-2) +
        '-01';
    }
    if (baseDate.getMonth() === 11) {
      // Dec
      endDate =
        baseDate.getFullYear() +
        1 +
        '-01-' +
        ('0' + showMonth[showMonth.length - 1]).slice(-2);
    } else {
      // !Dec
      endDate =
        baseDate.getFullYear() +
        '-' +
        ('0' + (baseDate.getMonth() + 2)).slice(-2) +
        '-' +
        ('0' + showMonth[showMonth.length - 1]).slice(-2);
    }
    const fetchedPlans = await httpGetPlans(userId, startDate, endDate);
    dispatch(
      planDataActions.setPlanInfo({
        planInfo: fetchedPlans.plan,
      })
    );
  };

  const submitPlan = async (e) => {
    e.preventDefault();
    const timeOffset = new Date().getTimezoneOffset() / 60;
    const data = new FormData(e.target);
    const prevDate = new Date(data.get('plan-date'));
    const date = prevDate.setHours(prevDate.getHours() + timeOffset);
    const description = data.get('description');
    const category = data.get('category');
    const mode = data.get('mode') === null ? false : true;
    let completed = data.get('completed') === null ? false : true;
    const response = await httpSubmitPlan({
      userId,
      date,
      description,
      category,
      mode,
      completed,
    });

    const success = response.ok;
    let fetchedPlans;
    if (success) {
      fetchedPlans = await httpGetPlans(userId, startDate, endDate);
      dispatch(planDataActions.setPlanInfo({ planInfo: fetchedPlans.plan }));
    }

    if (mode) {
      completed = false;
      repeatSetPlan({
        userId,
        fetchedPlans,
        data,
        category,
        description,
        date,
        mode,
        completed,
      });
      const fetchedAfterPlans = await httpGetPlans(userId, startDate, endDate);
      dispatch(
        planDataActions.setPlanInfo({ planInfo: fetchedAfterPlans.plan })
      );
    }
    dispatch(planDataActions.setPlanFlg({ planSetFlg: false }));
  };

  const editPlan = async (e) => {
    e.preventDefault();
    const timeOffset = new Date().getTimezoneOffset() / 60;
    const data = new FormData(e.target);
    const _id = data.get('_id');
    const baseId = data.get('baseId') ? data.get('baseId') : _id;
    const prevMode = data.get('prevMode') === 'true' ? true : false;
    const prevDate = new Date(data.get('plan-date'));
    const date = prevDate.setHours(prevDate.getHours() + timeOffset);
    const description = data.get('description');
    const category = data.get('category');
    const mode = data.get('mode') === null ? false : true;
    let completed = data.get('completed') === null ? false : true;
    const response = await httpEditPlan(_id, {
      userId,
      date,
      description,
      category,
      mode,
      completed,
    });

    if (prevMode && !mode) {
      await httpSearchDeletePlan(baseId, date);
    } else if (prevMode === false && mode) {
      completed = false;
      repeatSetPlan({
        userId,
        data,
        category,
        description,
        date,
        mode,
        completed,
        baseId,
      });
    }

    const success = response.ok;
    if (success) {
      const fetchedPlans = await httpGetPlans(userId, startDate, endDate);
      dispatch(planDataActions.setPlanInfo({ planInfo: fetchedPlans.plan }));
    }
    dispatch(planDataActions.editPlanInfo({ planEditInfo: '' }));
    dispatch(planDataActions.setPlanFlg({ planSetFlg: false }));
  };

  const deletePlan = async ({ id }) => {
    const response = await httpDeletePlan(id);

    const success = response.ok;
    if (success) {
      const fetchedPlans = await httpGetPlans(userId, startDate, endDate);
      dispatch(planDataActions.setPlanInfo({ planInfo: fetchedPlans.plan }));
    }
  };

  return {
    getPlans,
    submitPlan,
    editPlan,
    deletePlan,
  };
};

export default usePlan;
