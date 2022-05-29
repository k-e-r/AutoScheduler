import { useSelector, useDispatch } from 'react-redux';
import { categoryListActions } from '../../../store/categoryList-slice';
import useCategory from '../../../hooks/useCategory';

import './EditCategory.scss';
import Category from '../../../components/category/Category';
import { useState } from 'react';

function EditCategory() {
  const dispatch = useDispatch();
  const categoryEditFlg = useSelector(
    (state) => state.categoryList.categoryEditFlg
  );
  const { editCategory } = useCategory();
  const categoryList = useSelector((state) => state.categoryList.categoryList);
  const [showCategoryList, setShowCategoryList] = useState(categoryList);
  const categoryColorList = useSelector(
    (state) => state.categoryList.categoryColorList
  );
  const [showColorList, setShowColorList] = useState(categoryColorList);

  const changeCategoryList = (category) => {
    setShowCategoryList((prev) => [...prev, category]);
  };

  const changeColorList = (color) => {
    setShowColorList((prev) => [...prev, color]);
  };

  const popupClose = () => {
    dispatch(
      categoryListActions.setCategoryEditFlg({ categoryEditFlg: false })
    );
  };

  return (
    <>
      {categoryEditFlg && (
        <>
          <div className='editcategory__back' onClick={() => popupClose()} />
          <div className='editcategory__card'>
            <Category
              category=''
              color=''
              mode={true}
              addShowCategory={changeCategoryList}
              addShowColor={changeColorList}
            />
            <form
              onSubmit={editCategory}
              autoComplete='off'
              className='editcategory__form'
            >
              {showCategoryList.map((category, idx) => (
                <Category
                  category={category}
                  color={showColorList[idx]}
                  mode={false}
                  key={idx}
                />
              ))}
              <button type='submit'>Submit</button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default EditCategory;
