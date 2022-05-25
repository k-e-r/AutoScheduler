import { createSlice } from '@reduxjs/toolkit';

const planDateSlice = createSlice({
  name: 'planDate',
  initialState: { planDate: '', planSetFlg: false },
  reducers: {
    setPlan(state, action) {
      state.planDate = action.payload.planDate;
    },
    setPlanFlg(state, action) {
      state.planSetFlg = action.payload.planSetFlg;
    },
  },
});

export const planDateActions = planDateSlice.actions;

export default planDateSlice;
