import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checking: false,
  exists: false,
  userInformation: null, // Store a single user information object
  error: null,
};

const existingPhoneSlice = createSlice({
  name: 'existingPhone',
  initialState,
  reducers: {
    checkcontactExistsStart: (state) => {
      state.checking = true;
      state.exists = false;
      state.error = null;
    },
    checkcontactExistsSuccess: (state, action) => {
      state.checking = false;
      state.exists = action.payload.exists;

      if (action.payload.exists) {
        // Override user information with the latest data
        state.userInformation = action.payload.userInformation;
      } else {
        // If contact doesn't exist, set userInformation to null
        state.userInformation = null;
      }

      state.error = null;
    },
    checkcontactExistsFailure: (state, action) => {
      state.checking = false;
      state.exists = false;
      state.error = action.payload;
    },
  },
});

export const { checkcontactExistsStart, checkcontactExistsSuccess, checkcontactExistsFailure } = existingPhoneSlice.actions;

export default existingPhoneSlice.reducer;
