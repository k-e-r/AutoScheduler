import { useState } from 'react';
import { Trash } from 'tabler-icons-react';

import { SketchPicker } from 'react-color';
import usePlan from '../../hooks/usePlan';

import './Category.scss';

const Category = ({ category, color, id }) => {
  const [sketchPickerColor, setSketchPickerColor] = useState(color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const { deleteCategory } = usePlan();
  let clickCount = 0;

  const displayChange = () => {
    setDisplayColorPicker((prev) => !prev);
  };

  const handleSingleOrDoubleClick = () => {
    clickCount++;

    if (clickCount < 2) {
      setTimeout(() => {
        if (clickCount > 1) {
          deleteCategory({ id, category });
        }
        clickCount = 0;
      }, 200);
    }
  };

  return (
    <div className='editcategory__form__wrapper'>
      <span
        className='editcategory__form__colorIcon'
        style={{ backgroundColor: sketchPickerColor }}
        onClick={displayChange}
      ></span>
      {displayColorPicker && (
        <>
          <div
            className='editcategory__form__colorPalette-close'
            onClick={displayChange}
          ></div>
          <SketchPicker
            onChange={(color) => {
              setSketchPickerColor(color.hex);
            }}
            color={sketchPickerColor}
            className='editcategory__form__colorPalette'
          />
        </>
      )}
      <input
        type='hidden'
        name={`category-color`}
        value={sketchPickerColor}
        className='editcategory__form__input'
      />
      <label
        htmlFor='category-List'
        key={category}
        className='editcategory__form__label'
      ></label>
      <input
        type='text'
        id='category-List'
        name={`category-List`}
        defaultValue={category}
        className='editcategory__form__input'
        required
      />
      <Trash
        className='editcategory__form__icon'
        size={25}
        strokeWidth={1.2}
        onClick={() => handleSingleOrDoubleClick()}
      />
    </div>
  );
};

export default Category;
