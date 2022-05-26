import { createSlice } from '@reduxjs/toolkit';

const planDataSlice = createSlice({
  name: 'planData',
  initialState: {
    planDate: new Date().toISOString(),
    planInfo: [],
    planSetFlg: false,
    planEditFlg: false,
  },
  reducers: {
    setPlanDate(state, action) {
      state.planDate = action.payload.planDate;
    },
    setPlanInfo(state, action) {
      state.planInfo = action.payload.planInfo;
    },
    setPlanFlg(state, action) {
      state.planSetFlg = action.payload.planSetFlg;
    },
    editPlanFlg(state, action) {
      state.planEditFlg = action.payload.planEditFlg;
    },
  },
});

export const planDataActions = planDataSlice.actions;

export default planDataSlice;
