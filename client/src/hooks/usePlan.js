import { useSelector, useDispatch } from 'react-redux';
import {
  httpGetCategories,
  httpGetPlans,
  httpSubmitPlan,
  httpEditPlan,
  httpEditCategory,
} from './request';
import { planDataActions } from '../store/planData-slice';
import { categoryListActions } from '../store/categoryList-slice';

const usePlan = () => {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.searchDate.startDate);
  const endDate = useSelector((state) => state.searchDate.endDate);
  const category = [...useSelector((state) => state.categoryList.categoryList)];
  const color = [
    ...useSelector((state) => state.categoryList.categoryColorList),
  ];

  const submitPlan = async (e) => {
    e.preventDefault();
    const timeOffset = new Date().getTimezoneOffset() / 60;
    const data = new FormData(e.target);
    const prevDate = new Date(data.get('plan-date'));
    const date = prevDate.setHours(prevDate.getHours() + timeOffset);
    const description = data.get('description');
    const category = data.get('category');
    const mode = data.get('mode') === null ? false : data.get('mode');
    const completed =
      data.get('completed') === null ? false : data.get('completed');
    const response = await httpSubmitPlan({
      date,
      description,
      category,
      mode,
      completed,
    });

    const success = response.ok;
    if (success) {
      const fetchedPlans = await httpGetPlans(startDate, endDate);
      dispatch(planDataActions.setPlanInfo({ planInfo: fetchedPlans.plan }));
    }
    dispatch(planDataActions.setPlanFlg({ planSetFlg: false }));
  };

  const editPlan = async (e) => {
    e.preventDefault();
    const timeOffset = new Date().getTimezoneOffset() / 60;
    const data = new FormData(e.target);
    const _id = data.get('_id');
    const prevDate = new Date(data.get('plan-date'));
    const date = prevDate.setHours(prevDate.getHours() + timeOffset);
    const description = data.get('description');
    const category = data.get('category');
    const mode = data.get('mode') === null ? false : data.get('mode');
    const completed =
      data.get('completed') === null ? false : data.get('completed');
    const response = await httpEditPlan(_id, {
      date,
      description,
      category,
      mode,
      completed,
    });

    const success = response.ok;
    if (success) {
      const fetchedPlans = await httpGetPlans(startDate, endDate);
      dispatch(planDataActions.setPlanInfo({ planInfo: fetchedPlans.plan }));
    }
    dispatch(planDataActions.editPlanInfo({ planEditInfo: '' }));
  };

  const editCategory = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let _id,
      categoryColor = [],
      categoryList = [];
    for (let d of data.entries()) {
      console.log(`${d[0]}: ${d[1]}`);
      if (d[0] === '_id') _id = d[1];
      else if (d[0] === 'category-color') categoryColor.push(d[1]);
      else if (d[0] === 'category-List') categoryList.push(d[1]);
    }
    console.log(_id);
    console.log(categoryColor);
    console.log(categoryList);
    // console.log('fd', fd.get('category-color'));
    // const response = await httpEditPlan(_id, {
    //   date,
    //   description,
    //   category,
    //   mode,
    //   completed,
    // });

    // const success = response.ok;
    // if (success) {
    //   const fetchedPlans = await httpGetPlans(startDate, endDate);
    //   dispatch(planDataActions.setPlanInfo({ planInfo: fetchedPlans.plan }));
    // }
    // dispatch(planDataActions.editPlanInfo({ planEditInfo: '' }));
  };

  const deleteCategory = async ({ id, delCategory }) => {
    const delIdx = category.findIndex((el) => el === delCategory);
    category.splice(delIdx, 1);
    color.splice(delIdx, 1);
    const response = await httpEditCategory(id, {
      category,
      color,
    });

    const success = response.ok;
    if (success) {
      const fetchedCategories = await httpGetCategories();
      dispatch(
        categoryListActions.setCategoryList(fetchedCategories.category[0])
      );
    }
  };

  return {
    submitPlan,
    editPlan,
    editCategory,
    deleteCategory,
  };
};

export default usePlan;
