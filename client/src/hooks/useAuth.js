import { useDispatch } from 'react-redux';
import { httpLogin, httpRegister } from './requestAuth';

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

    if (response.userId !== undefined) {
      dispatch(
        authActions.login({
          userId: response.userId,
          userEmail: email,
        })
      );
    }
  };

  const authRegister = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');
    const response = await httpRegister({
      email,
      password,
    });

    console.log(response);
  };

  return {
    authLogin,
    authRegister,
  };
};

export default useAuth;
