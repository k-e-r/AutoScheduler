import { createSlice } from '@reduxjs/toolkit';

const searchDateSlice = createSlice({
  name: 'searchDate',
  initialState: {
    startDate: '',
    endDate: '',
  },
  reducers: {
    setSearchDate(state, action) {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});

export const searchDateActions = searchDateSlice.actions;

export default searchDateSlice;
