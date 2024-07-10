import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    emailEntered: false,
    email: '',
    registrationStatus: {
      loading: false,
      exists: null,
      error: null,
    },
    emailCheck: {
      loading: false,
      exists: null,
      error: null,
    },
    loginStatus: {
      loading: false,
      exists: null,
      error: null,
    },
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setEmailEntered: (state, action) => {
      state.emailEntered = action.payload;
    },
    registerUserStart: (state) => {
      state.registrationStatus.loading = true;
    },
    registerUserSuccess: (state, action) => {
      state.registrationStatus.loading = false;
      state.registrationStatus.exists = action.payload.exists;
      state.registrationStatus.error = null;
    },
    registerUserFailure: (state, action) => {
      state.registrationStatus.loading = false;
      state.registrationStatus.exists = null;
      state.registrationStatus.error = action.payload;
    },
    checkEmailExistsStart: (state) => {
      state.emailCheck.loading = true;
    },
    checkEmailExistsSuccess: (state, action) => {
      state.emailCheck.loading = false;
      state.emailCheck.exists = action.payload.exists;
      state.emailCheck.error = null;
    },
    checkEmailExistsFailure: (state, action) => {
      state.emailCheck.loading = false;
      state.emailCheck.exists = null;
      state.emailCheck.error = action.payload;
    },
    loginStart: (state) => {
      state.loginStatus.loading = true;
    },
    loginSuccess: (state,action) => {
      state.loginStatus.loading = false;
      state.loginStatus.exists = action.payload.exists;
      state.loginStatus.error = null;
    },
    loginFailure: (state, action) => {
      state.loginStatus.loading = false;
      state.loginStatus.exists = false;
      state.loginStatus.error = action.payload;
    },
  },
});

export const {
  setEmailEntered,
  registerUserSuccess,
  registerUserStart,
  registerUserFailure,
  checkEmailExistsStart,
  checkEmailExistsSuccess,
  checkEmailExistsFailure,
  setEmail,
  loginStart,
  loginSuccess,
  loginFailure,
} = authSlice.actions;

export const selectEmailEntered = (state) => state.auth.emailEntered;
export const selectRegistrationStatus = (state) => state.auth.registrationStatus;
export const selectRegistrationStatusexist = (state) => state.auth.registrationStatus.exists;
export const selectEmailCheckLoading = (state) => state.auth.emailCheck.loading;
export const selectEmailExists = (state) => state.auth.emailCheck.exists;
export const selectEmailCheckError = (state) => state.auth.emailCheck.error;
export const selectEmail = (state) => state.auth.email;
export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectLoginStatusexist = (state) => state.auth.loginStatus.exists;

export default authSlice.reducer;
