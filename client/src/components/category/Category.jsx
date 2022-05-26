import { useState, useRef } from 'react';
import { Trash, Edit } from 'tabler-icons-react';

import { SketchPicker } from 'react-color';
import useCategory from '../../hooks/useCategory';

import './Category.scss';

const Category = ({ category, color, mode, id }) => {
  const refAddCategory = useRef();
  const refAddColor = useRef();
  const [sketchPickerColor, setSketchPickerColor] = useState(
    color ? color : '#ef93b6'
  );
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const { addCategory, deleteCategory } = useCategory();
  let clickCount = 0;

  const displayChange = () => {
    setDisplayColorPicker((prev) => !prev);
  };

  const handleSingleOrDoubleClick = () => {
    clickCount++;

    if (clickCount < 2) {
      setTimeout(() => {
        if (clickCount > 1) {
          if (!mode) deleteCategory({ id, category });
        } else {
          if (mode) {
            console.log(
              refAddCategory.current.value,
              refAddColor.current.value
            );
            const categoryData = refAddCategory.current.value;
            const colorData = refAddColor.current.value;
            addCategory({ id, categoryData, colorData });
            refAddCategory.current.value = '';
            setSketchPickerColor('#ef93b6');
          }
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
        ref={refAddColor}
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
        autoComplete='off'
        ref={refAddCategory}
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
