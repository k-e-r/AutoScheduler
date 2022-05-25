import { configureStore } from '@reduxjs/toolkit';

import planDateSlice from './planDate-slice';
import planInfoSlice from './planInfo-slice';
import searchDateSlice from './searchDate-slice';

const store = configureStore({
  reducer: {
    planDate: planDateSlice.reducer,
    planInfo: planInfoSlice.reducer,
    searchDate: searchDateSlice.reducer,
  },
});

export default store;
