import { useState } from 'react';
import { Trash, Edit } from 'tabler-icons-react';

import { SketchPicker } from 'react-color';
import usePlan from '../../hooks/usePlan';

import './Category.scss';

const Category = ({ category, color, mode, id }) => {
  const [sketchPickerColor, setSketchPickerColor] = useState(
    color ? color : '#ef93b6'
  );
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
      {mode ? (
        <Edit
          className='editcategory__form__iconEdit'
          size={25}
          strokeWidth={1.7}
          onClick={() => handleSingleOrDoubleClick()}
        />
      ) : (
        <Trash
          className='editcategory__form__iconDelete'
          size={25}
          strokeWidth={1.7}
          onClick={() => handleSingleOrDoubleClick()}
        />
      )}
    </div>
  );
};

export default Category;
