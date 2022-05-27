import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: '',
    userEmail: '',
    isLoggedIn: false,
  },
  reducers: {
    loginCheck(state) {
      state.userId = sessionStorage.getItem('userId');
      state.userEmail = sessionStorage.getItem('userEmail');
      state.isLoggedIn = !!sessionStorage.getItem('userId');
    },
    login(state, action) {
      const authData = action.payload;
      state.userId = authData.userId;
      state.userEmail = authData.userEmail;
      state.isLoggedIn = true;

      sessionStorage.setItem('userId', authData.userId);
      sessionStorage.setItem('userEmail', authData.userEmail);
    },
    logout(state) {
      state.userId = null;
      state.userEmail = null;
      state.isLoggedIn = false;

      sessionStorage.clear();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
