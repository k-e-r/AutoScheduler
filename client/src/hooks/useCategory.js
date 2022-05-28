import { useSelector, useDispatch } from 'react-redux';
import { httpGetCategories, httpEditCategory } from './requestCategory';
import { categoryListActions } from '../store/categoryList-slice';

const useCategory = () => {
  const dispatch = useDispatch();
  const category = [...useSelector((state) => state.categoryList.categoryList)];
  const color = [
    ...useSelector((state) => state.categoryList.categoryColorList),
  ];
  const userId = useSelector((state) => state.auth.userId);

  const getCategory = async () => {
    const fetchedCategories = await httpGetCategories(userId);
    dispatch(
      categoryListActions.setCategoryList(fetchedCategories.category[0])
    );
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
    getCategory,
    editCategory,
    addCategory,
    deleteCategory,
  };
};

export default useCategory;
