import { useSelector, useDispatch } from 'react-redux';
import { categoryListActions } from '../../store/categoryList-slice';
import usePlan from '../../hooks/usePlan';

import './EditCategory.scss';
import Category from '../../components/category/Category';

function EditCategory() {
  const dispatch = useDispatch();
  const { editCategory } = usePlan();
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

  const testHandle = () => {
    console.log('test~handle');
  };

  return (
    <>
      <div className='editcategory__back' onClick={() => popupClose()} />
      <div className='editcategory__card'>
        {/* <form className='editcategory__form'>
          <span style={{ backgroundColor: 'rgb(255 165 66)' }}></span>
          <input type='text' name={`category-List`} />
          <Edit
            type='submit'
            className='editcategory__form__icon'
            size={25}
            strokeWidth={1.2}
            onClick={testHandle}
          />
        </form> */}
        <input type='hidden' name='_id' value={_id} />
        <form onSubmit={editCategory} className='editcategory__form'>
          {categoryList.map((category, idx) => (
            <Category
              category={category}
              color={categoryColorList[idx]}
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
