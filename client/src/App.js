import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import SetPlan from './pages/setplan/SetPlan';
import EditPlan from './pages/editplan/EditPlan';

const App = () => {
  const statePlanSetFlg = useSelector((state) => state.planData.planSetFlg);
  const [planSetFlg, setPlanSetFlg] = useState(statePlanSetFlg);
  const stateplanEditFlg = useSelector((state) => state.planData.planEditFlg);
  const [planEditFlg, setPlanEditFlg] = useState(statePlanSetFlg);

  useEffect(() => {
    setPlanSetFlg(statePlanSetFlg);
  }, [statePlanSetFlg]);

  useEffect(() => {
    setPlanEditFlg(stateplanEditFlg);
  }, [stateplanEditFlg]);

  return (
    <>
      <Home />
      <Calendar />
      {planSetFlg && <SetPlan />}
      {planEditFlg && <EditPlan />}
    </>
  );
};

export default App;
