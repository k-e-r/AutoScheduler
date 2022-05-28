import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import AuthLogin from './pages/authentication/AuthLogin';
import { authActions } from './store/auth-slice';
import Popup from './pages/popup/Popup';

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
        {isLoggedIn ? (
          <Route path='/' element={<Calendar />} />
        ) : (
          <Route path='/' element={<AuthLogin />} />
        )}
      </Routes>
      <Popup />
    </>
  );
};

export default App;
