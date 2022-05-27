import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

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
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Routes>
        {isLoggedIn && (
          <Route path='*' element={<Navigate replace to='calendar' />} />
        )}
        {!isLoggedIn && (
          <Route path='*' element={<Navigate replace to='login' />} />
        )}
        {isLoggedIn && <Route path='calendar' element={<Calendar />} />}
        {!isLoggedIn && <Route path='login' element={<AuthLogin />} />}
        {planSetFlg && <PlanPopup planInfo={planEditInfo} />}
        {categoryEditFlg && <EditCategory />}
      </Routes>
    </>
  );
};

export default App;
