import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { httpLogin } from './requestAuth';

import { authActions } from '../store/auth-slice';

const useAuth = () => {
  const dispatch = useDispatch();

  const authLogin = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');
    const response = await httpLogin({
      email,
      password,
    });

    console.log('response', response.userId);
    if (response.userId !== undefined) {
      dispatch(
        authActions.login({
          userId: response.userId,
          userEmail: email,
        })
      );
    }
  };

  return {
    authLogin,
  };
};

export default useAuth;
