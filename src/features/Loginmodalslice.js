// src/features/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginshowModal: false,
};

const Loginmodalslice = createSlice({
  name: 'loginmodal',
  initialState,
  reducers: {
    setloginShowModal: (state, action) => {
      state.loginshowModal = action.payload;
    },
  },
});

export const { setloginShowModal } = Loginmodalslice.actions;
export const selectloginShowModal = (state) => state.loginmodal.loginshowModal;
export default Loginmodalslice.reducer;
