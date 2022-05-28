import { useDispatch } from 'react-redux';
import { httpLogin, httpRegister } from './requestAuth';

import { authActions } from '../store/auth-slice';
import useCategory from './useCategory';

const useAuth = () => {
  const dispatch = useDispatch();
  const { setCategory } = useCategory();

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
    } else {
      alert(response.msg, response.err);
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

    if (response.userId !== undefined) {
      dispatch(
        authActions.login({
          userId: response.userId,
          userEmail: response.email,
        })
      );

      setCategory(response.userId);
    } else {
      alert(response.msg);
    }
  };

  return {
    authLogin,
    authRegister,
  };
};

export default useAuth;
