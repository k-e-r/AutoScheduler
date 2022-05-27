import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import EditCategory from './pages/editcategory/EditCategory';
import PlanPopup from './pages/planpopup/PlanPopup';
import AuthLogin from './pages/authentication/AuthLogin';
import { authActions } from './store/auth-slice';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    dispatch(authActions.loginCheck());
  }, []);

  return (
    <>
      {isLoggedIn && <Home />}
      <Routes>
        {isLoggedIn && <Route path='/' element={<Calendar />} />}
        {!isLoggedIn && <Route path='/' element={<AuthLogin />} />}
      </Routes>
      <PlanPopup />
      <EditCategory />
    </>
  );
};

export default App;
