import { httpSubmitPlan } from './requestPlan';
import forgettingCurve from '../config';

const usePlanFunc = () => {
  const repeatSetPlan = async ({
    userId,
    fetchedPlans = '',
    data,
    category,
    description,
    date,
    mode,
    completed,
    baseId = '',
  }) => {
    if (baseId === '') {
      fetchedPlans.plan.forEach((val) => {
        if (val.date.split('T')[0] === data.get('plan-date')) {
          if (val.category === category) {
            if (val.description === description) {
              baseId = val._id;
            }
          }
        }
      });
    }

    const baseDate = date,
      baseDesc = description;
    forgettingCurve.forEach(async (val, times) => {
      const date = baseDate + val * 24 * 60 * 60 * 1000;
      const description = `${baseDesc} (${times + 1})`;
      await httpSubmitPlan({
        userId,
        date,
        description,
        category,
        mode,
        completed,
        baseId,
        times,
      });
    });
  };

  return {
    repeatSetPlan,
  };
};

export default usePlanFunc;
