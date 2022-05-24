import { configureStore } from '@reduxjs/toolkit';

import planDateSlice from './planDate-slice';

const store = configureStore({
  reducer: {
    planDate: planDateSlice.reducer,
  },
});

export default store;
