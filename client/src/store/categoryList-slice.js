import { createSlice } from '@reduxjs/toolkit';

const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState: {
    categoryList: [],
    categoryColorList: [],
    _id: '',
  },
  reducers: {
    setCategoryList(state, action) {
      state._id = action.payload._id;
      state.categoryList = action.payload.category;
      state.categoryColorList = action.payload.color;
    },
  },
});

export const categoryListActions = categoryListSlice.actions;

export default categoryListSlice;
