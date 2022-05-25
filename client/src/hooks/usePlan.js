import { httpSubmitPlan } from './request';

const usePlan = () => {
  const submitPlan = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const date = new Date(data.get('plan-date'));
    const description = data.get('description');
    const mode = data.get('mode') === null ? false : data.get('mode');
    const completed =
      data.get('completed') === null ? false : data.get('completed');
    const response = await httpSubmitPlan({
      date,
      description,
      mode,
      completed,
    });

    console.log(response.ok);
  };

  return {
    submitPlan,
  };
};

export default usePlan;
