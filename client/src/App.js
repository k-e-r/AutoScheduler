import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import SetPlan from './pages/setplan/SetPlan';

const App = () => {
  const statePlanDate = useSelector((state) => state.planDate.planDate);
  const [planDate, setPlanDate] = useState(statePlanDate);

  useEffect(() => {
    setPlanDate(statePlanDate);
  }, [statePlanDate]);

  return (
    <>
      <Home />
      <Calendar />
      {planDate && <SetPlan />}
    </>
  );
};

export default App;
