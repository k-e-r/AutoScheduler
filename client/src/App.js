import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import SetPlan from './pages/setplan/SetPlan';

const App = () => {
  const statePlanSetFlg = useSelector((state) => state.planDate.planSetFlg);
  const [planSetFlg, setPlanSetFlg] = useState(statePlanSetFlg);

  useEffect(() => {
    setPlanSetFlg(statePlanSetFlg);
  }, [statePlanSetFlg]);

  return (
    <>
      <Home />
      <Calendar />
      {planSetFlg && <SetPlan />}
    </>
  );
};

export default App;
