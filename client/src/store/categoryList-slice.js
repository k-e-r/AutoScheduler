import { createSlice } from '@reduxjs/toolkit';

const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState: { categoryList: [] },
  reducers: {
    setCategoryList(state, action) {
      console.log('list:', action.payload);
      state.categoryList = action.payload;
    },
  },
});

export const categoryListActions = categoryListSlice.actions;

export default categoryListSlice;
