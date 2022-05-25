import { configureStore } from '@reduxjs/toolkit';

import planDateSlice from './planDate-slice';
import planInfoSlice from './planInfo-slice';

const store = configureStore({
  reducer: {
    planDate: planDateSlice.reducer,
    planInfo: planInfoSlice.reducer,
  },
});

export default store;
