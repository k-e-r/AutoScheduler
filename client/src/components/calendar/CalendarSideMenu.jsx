import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoryListActions } from '../../store/categoryList-slice';

import './CalendarSideMenu.scss';

const CalendarSideMenu = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList.categoryList);
  const stateCategoryColor = useSelector(
    (state) => state.categoryList.categoryColorList
  );
  const [categoryColor, setCategoryColor] = useState(stateCategoryColor);

  useEffect(() => {
    setCategoryColor(stateCategoryColor);
  }, [stateCategoryColor]);

  const editCategory = () => {
    dispatch(categoryListActions.setCategoryEditFlg({ categoryEditFlg: true }));
  };

  return (
    <div className='cal__sidemenu__wrapper'>
      <div className='cal__sidemenu__card' onClick={() => editCategory()}>
        Category List
      </div>
      {categoryList.map((category, idx) => (
        <div className='cal__sidemenu__category' key={idx}>
          <span style={{ backgroundColor: categoryColor[idx] }}></span>
          <p className=''>{category}</p>
        </div>
      ))}
    </div>
  );
};

export default CalendarSideMenu;
