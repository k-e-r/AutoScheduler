import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import SetPlan from './pages/setplan/SetPlan';
import EditPlan from './pages/editplan/EditPlan';

const App = () => {
  const statePlanSetFlg = useSelector((state) => state.planData.planSetFlg);
  const [planSetFlg, setPlanSetFlg] = useState(statePlanSetFlg);
  const stateplanEditInfo = useSelector((state) => state.planData.planEditInfo);
  const [planEditInfo, setPlanEditInfo] = useState(statePlanSetFlg);
  console.log('planEditInfo', planEditInfo);

  useEffect(() => {
    setPlanSetFlg(statePlanSetFlg);
  }, [statePlanSetFlg]);

  useEffect(() => {
    setPlanEditInfo(stateplanEditInfo);
  }, [stateplanEditInfo]);

  return (
    <>
      <Home />
      <Calendar />
      {planSetFlg && <SetPlan />}
      {planEditInfo && <EditPlan />}
    </>
  );
};

export default App;
