import { createSlice } from '@reduxjs/toolkit';

const planInfoSlice = createSlice({
  name: 'planInfo',
  initialState: { planInfo: [] },
  reducers: {
    checkPlan(state) {
      state.planInfo = sessionStorage.getItem('planInfo');
    },
    // setPlan(state, action) {
    //   const existingPlanIndex = state.planInfo.findIndex((plan) => {
    //     plan.description === action.payload.description;
    //   });

    //   if (existingPlanIndex === -1) {
    //     if (state.planInfo.length !== 0) {
    //       state.planInfo = state.planInfo.concat([action.payload]);
    //     } else {
    //       state.planInfo = [action.payload];
    //     }
    //   }
    // },
  },
});

export const planInfoActions = planInfoSlice.actions;

export default planInfoSlice;
