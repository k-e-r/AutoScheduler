import { useSelector, useDispatch } from 'react-redux';
import { categoryListActions } from '../../../store/categoryList-slice';
import useCategory from '../../../hooks/useCategory';

import './EditCategory.scss';
import Category from '../../../components/category/Category';

function EditCategory() {
  const dispatch = useDispatch();
  const categoryEditFlg = useSelector(
    (state) => state.categoryList.categoryEditFlg
  );
  const { editCategory } = useCategory();
  const categoryList = useSelector((state) => state.categoryList.categoryList);
  const categoryColorList = useSelector(
    (state) => state.categoryList.categoryColorList
  );

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
            <Category category='' color='' mode={true} />
            <form
              onSubmit={editCategory}
              autoComplete='off'
              className='editcategory__form'
            >
              {categoryList.map((category, idx) => (
                <Category
                  category={category}
                  color={categoryColorList[idx]}
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
