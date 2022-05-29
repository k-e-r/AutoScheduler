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

  const addShowList = (category, color) => {
    const existingListIndex = categoryList.findIndex(
      (categoryList) => categoryList === category
    );
    if (existingListIndex === -1) {
      setShowCategoryList((prev) => [...prev, category]);
    } else {
      const chgColor = showColorList.slice();
      chgColor.splice(existingListIndex, 1, color);
      setShowColorList(chgColor);
    }
  };

  const removeShowList = (category) => {
    const existingListIndex = showCategoryList.findIndex(
      (categoryList) => categoryList === category
    );
    if (existingListIndex !== -1) {
      const chgCategory = showCategoryList.slice();
      const chgColor = showColorList.slice();
      chgCategory.splice(existingListIndex, 1);
      chgColor.splice(existingListIndex, 1);
      setShowCategoryList(chgCategory);
      setShowColorList(chgColor);
    }
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
              addShowList={addShowList}
              removeShowList={removeShowList}
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
                  addShowList={addShowList}
                  removeShowList={removeShowList}
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
