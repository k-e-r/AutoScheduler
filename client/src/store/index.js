import { configureStore } from '@reduxjs/toolkit';
import categoryListSlice from './categoryList-slice';

import planDataSlice from './planData-slice';
import searchDateSlice from './searchDate-slice';

const store = configureStore({
  reducer: {
    planData: planDataSlice.reducer,
    searchDate: searchDateSlice.reducer,
    categoryList: categoryListSlice.reducer,
  },
});

export default store;
