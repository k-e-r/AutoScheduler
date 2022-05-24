import { createSlice } from '@reduxjs/toolkit';

const planDateSlice = createSlice({
  name: 'planDate',
  initialState: { planDate: '' },
  reducers: {
    setPlan(state, action) {
      state.planDate = action.payload;
    },
  },
});

export const planDateActions = planDateSlice.actions;

export default planDateSlice;
