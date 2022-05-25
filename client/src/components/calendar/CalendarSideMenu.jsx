import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './CalendarSideMenu.scss';

const CalendarSideMenu = () => {
  const categoryList = useSelector((state) => state.categoryList.categoryList);
  const stateCategoryColor = useSelector(
    (state) => state.categoryList.categoryColorList
  );
  const [categoryColor, setCategoryColor] = useState(stateCategoryColor);

  useEffect(() => {
    setCategoryColor(stateCategoryColor);
  }, [stateCategoryColor]);

  return (
    <div className='cal__sidemenu__wrapper'>
      <div className='cal__sidemenu__card'>Category List</div>
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
