import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import SetPlan from './pages/setplan/SetPlan';
import EditPlan from './pages/editplan/EditPlan';
import EditCategory from './pages/editcategory/EditCategory';

const App = () => {
  const statePlanSetFlg = useSelector((state) => state.planData.planSetFlg);
  const [planSetFlg, setPlanSetFlg] = useState(statePlanSetFlg);
  const statePlanEditInfo = useSelector((state) => state.planData.planEditInfo);
  const [planEditInfo, setPlanEditInfo] = useState(statePlanEditInfo);
  const stateCategoryEditFlg = useSelector(
    (state) => state.categoryList.categoryEditFlg
  );
  const [categoryEditFlg, setCategoryEditFlg] = useState(stateCategoryEditFlg);
  console.log('planEditInfo', planEditInfo);

  useEffect(() => {
    setPlanSetFlg(statePlanSetFlg);
  }, [statePlanSetFlg]);

  useEffect(() => {
    setPlanEditInfo(statePlanEditInfo);
  }, [statePlanEditInfo]);

  useEffect(() => {
    setCategoryEditFlg(stateCategoryEditFlg);
  }, [stateCategoryEditFlg]);

  return (
    <>
      <Home />
      <Calendar />
      {planSetFlg && <SetPlan />}
      {planEditInfo && <EditPlan />}
      {categoryEditFlg && <EditCategory />}
    </>
  );
};

export default App;
