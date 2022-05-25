import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import PlanCard from './pages/plan/PlanCard';
import { httpGetCategories } from './hooks/request';
import { categoryListActions } from './store/categoryList-slice';

const App = () => {
  const dispatch = useDispatch();
  const statePlanDate = useSelector((state) => state.planDate.planDate);
  const [planDate, setPlanDate] = useState(statePlanDate);

  useEffect(() => {
    setPlanDate(statePlanDate);
  }, [statePlanDate]);

  const getCategories = useCallback(async () => {
    const fetchedCategories = await httpGetCategories();
    dispatch(
      categoryListActions.setCategoryList(fetchedCategories.category[0])
    );
  });

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <>
      <Home />
      <Calendar />
      {planDate && <PlanCard />}
    </>
  );
};

export default App;
