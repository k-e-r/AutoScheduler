import { configureStore } from '@reduxjs/toolkit';
import categoryListSlice from './categoryList-slice';

import planDateSlice from './planDate-slice';
import planInfoSlice from './planInfo-slice';
import searchDateSlice from './searchDate-slice';

const store = configureStore({
  reducer: {
    planDate: planDateSlice.reducer,
    planInfo: planInfoSlice.reducer,
    searchDate: searchDateSlice.reducer,
    categoryList: categoryListSlice.reducer,
  },
});

export default store;
