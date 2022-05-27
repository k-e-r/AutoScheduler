import { useDispatch } from 'react-redux';
import { httpLogin } from './requestAuth';

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

    // const success = response.ok;
    // let fetchedPlans;
    // if (success) {
    //   fetchedPlans = await httpGetPlans(startDate, endDate);
    //   dispatch(planDataActions.setPlanInfo({ planInfo: fetchedPlans.plan }));
    // }
  };

  return {
    authLogin,
  };
};

export default useAuth;
