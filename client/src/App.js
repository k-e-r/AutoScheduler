import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import SetPlan from './pages/setplan/SetPlan';
import EditPlan from './pages/editplan/EditPlan';
import EditCategory from './pages/editcategory/EditCategory';

const App = () => {
  const planSetFlg = useSelector((state) => state.planData.planSetFlg);
  const planEditInfo = useSelector((state) => state.planData.planEditInfo);
  const categoryEditFlg = useSelector(
    (state) => state.categoryList.categoryEditFlg
  );

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
