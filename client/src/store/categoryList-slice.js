import { createSlice } from '@reduxjs/toolkit';

const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState: {
    categoryList: [],
    categoryColorList: [],
    categoryEditFlg: false,
  },
  reducers: {
    setCategoryList(state, action) {
      state.categoryList = action.payload.category;
      state.categoryColorList = action.payload.color;
    },
    setCategoryEditFlg(state, action) {
      state.categoryEditFlg = action.payload.categoryEditFlg;
    },
  },
});

export const categoryListActions = categoryListSlice.actions;

export default categoryListSlice;
