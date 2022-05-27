import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import Calendar from './pages/calendar/Calendar';
import EditCategory from './pages/editcategory/EditCategory';
import PlanPopup from './pages/planpopup/PlanPopup';
import AuthLogin from './pages/authentication/AuthLogin';
import { authActions } from './store/auth-slice';
import { useState } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const planSetFlg = useSelector((state) => state.planData.planSetFlg);
  const planEditInfo = useSelector((state) => state.planData.planEditInfo);
  const categoryEditFlg = useSelector(
    (state) => state.categoryList.categoryEditFlg
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const [planEditInfo, setPlanEditInfo] = useState(statePlanEditInfo);
  useEffect(() => {
    dispatch(authActions.loginCheck());
  }, []);

  // useEffect(() => {
  //   setPlanEditInfo(statePlanEditInfo);
  // }, [statePlanEditInfo]);

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
      </Routes>
      {planSetFlg && <PlanPopup planInfo={planEditInfo} />}
      {categoryEditFlg && <EditCategory />}
    </>
  );
};

export default App;
