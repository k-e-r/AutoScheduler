import { useState, useRef, useEffect } from 'react';
import { Trash, Edit } from 'tabler-icons-react';

import { SketchPicker } from 'react-color';

import './Category.scss';

const Category = ({ category, color, mode, addShowList, removeShowList }) => {
  const refAddCategory = useRef();
  const refAddColor = useRef();
  const [sketchPickerColor, setSketchPickerColor] = useState(
    color ? color : '#ef93b6'
  );
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  let clickCount = 0;

  useEffect(() => {
    setSketchPickerColor(color ? color : '#ef93b6');
  }, [color]);

  const displayChange = () => {
    setDisplayColorPicker((prev) => !prev);
  };

  const handleSingleOrDoubleClick = () => {
    clickCount++;

    if (clickCount < 2) {
      setTimeout(() => {
        if (clickCount > 1) {
          if (!mode) {
            removeShowList(category);
          }
        } else {
          if (mode) {
            const categoryData = refAddCategory.current.value;
            const colorData = refAddColor.current.value;
            addShowList(categoryData, colorData);
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
        name='category-color'
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
        name='category-List'
        defaultValue={category}
        className='editcategory__form__input'
        required
        autoComplete='off'
        ref={refAddCategory}
      />
      {mode ? (
        <Edit
          className='editcategory__form__iconEdit'
          onClick={() => handleSingleOrDoubleClick()}
        />
      ) : (
        <Trash
          className='editcategory__form__iconDelete'
          onClick={() => handleSingleOrDoubleClick()}
        />
      )}
    </div>
  );
};

export default Category;
