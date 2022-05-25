import { createSlice } from '@reduxjs/toolkit';

const planInfoSlice = createSlice({
  name: 'planInfo',
  initialState: { planInfo: [] },
  reducers: {
    setPlanInfo(state, action) {
      state.planInfo = action.payload;
    },
  },
});

export const planInfoActions = planInfoSlice.actions;

export default planInfoSlice;
