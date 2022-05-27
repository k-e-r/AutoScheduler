import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import categoryListSlice from './categoryList-slice';
import planDataSlice from './planData-slice';

const store = configureStore({
  reducer: {
    planData: planDataSlice.reducer,
    categoryList: categoryListSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
