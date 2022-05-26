import { useSelector, useDispatch } from 'react-redux';
import {
  httpGetCategories,
  httpGetPlans,
  httpSubmitPlan,
  httpEditPlan,
  httpEditCategory,
  httpDeletePlan,
  httpSearchDeletePlan,
} from './request';
import { planDataActions } from '../store/planData-slice';
import { categoryListActions } from '../store/categoryList-slice';
import forgettingCurve from '../config';
import usePlanFunc from './usePlanFunc';

const usePlan = () => {
  const dispatch = useDispatch();
  const { repeatSetPlan } = usePlanFunc();
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
    const mode = data.get('mode') === null ? false : true;
    const completed = data.get('completed') === null ? false : true;
    const response = await httpSubmitPlan({
      date,
      description,
      category,
      mode,
      completed,
    });

    const success = response.ok;
    let fetchedPlans;
    if (success) {
      fetchedPlans = await httpGetPlans(startDate, endDate);
      dispatch(planDataActions.setPlanInfo({ planInfo: fetchedPlans.plan }));
    }

    if (mode) {
      repeatSetPlan({
        fetchedPlans,
        data,
        category,
        description,
        date,
        mode,
        completed,
      });
      const fetchedAfterPlans = await httpGetPlans(startDate, endDate);
      dispatch(
        planDataActions.setPlanInfo({ planInfo: fetchedAfterPlans.plan })
      );
    }
    dispatch(planDataActions.setPlanFlg({ planSetFlg: false }));
  };

  const editPlan = async (e) => {
    e.preventDefault();
    const timeOffset = new Date().getTimezoneOffset() / 60;
    const data = new FormData(e.target);
    const _id = data.get('_id');
    const baseId = data.get('baseId') ? data.get('baseId') : _id;
    const prevMode = data.get('prevMode') === 'true' ? true : false;
    const prevDate = new Date(data.get('plan-date'));
    const date = prevDate.setHours(prevDate.getHours() + timeOffset);
    const description = data.get('description');
    const category = data.get('category');
    const mode = data.get('mode') === null ? false : true;
    const completed = data.get('completed') === null ? false : true;
    const response = await httpEditPlan(_id, {
      date,
      description,
      category,
      mode,
      completed,
    });

    if (prevMode && !mode) {
      await httpSearchDeletePlan(baseId, date);
    } else if (prevMode === false && mode) {
      repeatSetPlan({
        data,
        category,
        description,
        date,
        mode,
        completed,
        baseId,
      });
    }

    const success = response.ok;
    if (success) {
      const fetchedPlans = await httpGetPlans(startDate, endDate);
      dispatch(planDataActions.setPlanInfo({ planInfo: fetchedPlans.plan }));
    }
    dispatch(planDataActions.editPlanInfo({ planEditInfo: '' }));
  };

  const deletePlan = async ({ id }) => {
    const response = await httpDeletePlan(id);

    const success = response.ok;
    if (success) {
      const fetchedPlans = await httpGetPlans(startDate, endDate);
      dispatch(planDataActions.setPlanInfo({ planInfo: fetchedPlans.plan }));
    }
  };

  const editCategory = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let id,
      color = [],
      category = [];
    for (let d of data.entries()) {
      if (d[0] === '_id') id = d[1];
      else if (d[0] === 'category-color') color.push(d[1]);
      else if (d[0] === 'category-List') category.push(d[1]);
    }
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
    dispatch(
      categoryListActions.setCategoryEditFlg({ categoryEditFlg: false })
    );
  };

  const addCategory = async ({ id, categoryData, colorData }) => {
    category.push(categoryData);
    color.push(colorData);
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
    addCategory,
    deleteCategory,
    deletePlan,
  };
};

export default usePlan;
