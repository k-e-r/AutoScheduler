import { useState } from 'react';
import { Trash } from 'tabler-icons-react';

import { SketchPicker } from 'react-color';

import './Category.scss';

const Category = ({ category, color }) => {
  const [sketchPickerColor, setSketchPickerColor] = useState(color);
  console.log(sketchPickerColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const displayChange = () => {
    setDisplayColorPicker((prev) => !prev);
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
      <Trash className='editcategory__form__icon' size={25} strokeWidth={1.2} />
    </div>
  );
};

export default Category;
