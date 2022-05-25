import { httpSubmitPlan } from './request';

const usePlan = () => {
  const submitPlan = async (e) => {
    e.preventDefault();
    const timeOffset = new Date().getTimezoneOffset() / 60;
    const data = new FormData(e.target);
    const prevDate = new Date(data.get('plan-date'));
    const date = prevDate.setHours(prevDate.getHours() + timeOffset);
    console.log(new Date(date));
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
