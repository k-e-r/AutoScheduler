import { configureStore } from '@reduxjs/toolkit';
import categoryListSlice from './categoryList-slice';
import planDataSlice from './planData-slice';

const store = configureStore({
  reducer: {
    planData: planDataSlice.reducer,
    categoryList: categoryListSlice.reducer,
  },
});

export default store;
