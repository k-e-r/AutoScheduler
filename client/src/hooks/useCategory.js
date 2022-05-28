import { useSelector, useDispatch } from 'react-redux';
import {
  httpSetCategory,
  httpGetCategories,
  httpEditCategory,
} from './requestCategory';
import { categoryListActions } from '../store/categoryList-slice';

const DEFAULT_CATEGORY = ['programming', 'English', 'Others'];
const DEFAULT_COLOR = ['#6dc2ff', '#a5d8b9', '#8e7ae0'];

const useCategory = () => {
  const dispatch = useDispatch();
  const category = [...useSelector((state) => state.categoryList.categoryList)];
  const color = [
    ...useSelector((state) => state.categoryList.categoryColorList),
  ];
  const userId = useSelector((state) => state.auth.userId);

  const setCategory = async (userId) => {
    const response = await httpSetCategory({
      userId,
      category: DEFAULT_CATEGORY,
      color: DEFAULT_COLOR,
    });

    const success = response.ok;
    if (success) {
      const fetchedCategories = await httpGetCategories(userId);
      dispatch(
        categoryListActions.setCategoryList(fetchedCategories.category[0])
      );
    }
  };

  const getCategory = async () => {
    const fetchedCategories = await httpGetCategories(userId);
    dispatch(
      categoryListActions.setCategoryList(fetchedCategories.category[0])
    );
  };

  const editCategory = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let color = [],
      category = [];
    for (let d of data.entries()) {
      if (d[0] === 'category-color') color.push(d[1]);
      else if (d[0] === 'category-List') category.push(d[1]);
    }
    const response = await httpEditCategory(userId, {
      category,
      color,
    });

    const success = response.ok;
    if (success) {
      const fetchedCategories = await httpGetCategories(userId);
      dispatch(
        categoryListActions.setCategoryList(fetchedCategories.category[0])
      );
    }
    dispatch(
      categoryListActions.setCategoryEditFlg({ categoryEditFlg: false })
    );
  };

  const addCategory = async ({ categoryData, colorData }) => {
    category.push(categoryData);
    color.push(colorData);
    const response = await httpEditCategory(userId, {
      category,
      color,
    });

    const success = response.ok;
    if (success) {
      const fetchedCategories = await httpGetCategories(userId);
      dispatch(
        categoryListActions.setCategoryList(fetchedCategories.category[0])
      );
    }
  };

  const deleteCategory = async ({ delCategory }) => {
    const delIdx = category.findIndex((el) => el === delCategory);
    category.splice(delIdx, 1);
    color.splice(delIdx, 1);
    const response = await httpEditCategory(userId, {
      category,
      color,
    });

    const success = response.ok;
    if (success) {
      const fetchedCategories = await httpGetCategories(userId);
      dispatch(
        categoryListActions.setCategoryList(fetchedCategories.category[0])
      );
    }
  };

  return {
    setCategory,
    getCategory,
    editCategory,
    addCategory,
    deleteCategory,
  };
};

export default useCategory;
