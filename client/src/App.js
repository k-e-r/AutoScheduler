import { useSelector } from 'react-redux';
import { Route, Routes, Redirect } from 'react-router-dom';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import EditCategory from './pages/editcategory/EditCategory';
import PlanPopup from './pages/planpopup/PlanPopup';
import AuthLogin from './pages/authentication/AuthLogin';

const App = () => {
  const planSetFlg = useSelector((state) => state.planData.planSetFlg);
  const planEditInfo = useSelector((state) => state.planData.planEditInfo);
  const categoryEditFlg = useSelector(
    (state) => state.categoryList.categoryEditFlg
  );

  return (
    <>
      <Routes>
        <Route path='/login' element={<AuthLogin />} />
        {/* <Route path='/home' component={Home}  /> */}
        <Route path='/calendar' element={<Calendar />} />
        {/* <Home />
      <Calendar /> */}
        {planSetFlg && <PlanPopup planInfo={planEditInfo} />}
        {categoryEditFlg && <EditCategory />}
      </Routes>
    </>
  );
};

export default App;
