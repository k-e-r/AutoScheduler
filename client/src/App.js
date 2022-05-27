import { useSelector } from 'react-redux';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import EditCategory from './pages/editcategory/EditCategory';
import PlanPopup from './pages/planpopup/PlanPopup';

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
      {planSetFlg && <PlanPopup planInfo={planEditInfo} />}
      {categoryEditFlg && <EditCategory />}
    </>
  );
};

export default App;
