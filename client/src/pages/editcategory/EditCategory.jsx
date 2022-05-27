import { useSelector, useDispatch } from 'react-redux';
import { categoryListActions } from '../../store/categoryList-slice';
import useCategory from '../../hooks/useCategory';

import './EditCategory.scss';
import Category from '../../components/category/Category';

function EditCategory() {
  const dispatch = useDispatch();
  const { editCategory } = useCategory();
  const categoryList = useSelector((state) => state.categoryList.categoryList);
  const categoryColorList = useSelector(
    (state) => state.categoryList.categoryColorList
  );
  const _id = useSelector((state) => state.categoryList._id);

  const popupClose = () => {
    dispatch(
      categoryListActions.setCategoryEditFlg({ categoryEditFlg: false })
    );
  };

  return (
    <>
      <div className='editcategory__back' onClick={() => popupClose()} />
      <div className='editcategory__card'>
        <Category category='' color='' mode={true} id={_id} />
        <form
          onSubmit={editCategory}
          autoComplete='off'
          className='editcategory__form'
        >
          <input type='hidden' name='_id' value={_id} />
          {categoryList.map((category, idx) => (
            <Category
              category={category}
              color={categoryColorList[idx]}
              id={_id}
              mode={false}
              key={idx}
            />
          ))}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default EditCategory;
