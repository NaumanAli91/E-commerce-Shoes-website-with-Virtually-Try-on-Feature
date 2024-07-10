import { createSlice } from "@reduxjs/toolkit";

const reviewslice = createSlice({
  name: "reviews",
  initialState: {
    reviews:[],
    reviewadded:[],
    loading: false,
    error: null,
  },
  reducers: {
    fetchreviewStart: (state) => {
      state.loading = true;
      state.error = null; 
    },
    fetchreviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      console.log(action.payload);
    },
    fetchreviewFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addReviewStart: state => {
      state.loading = true;
      state.error = null;
    },
    addReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviewadded=action.payload;
      state.error = null;
     
    },
    addReviewFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchreviewStart,
  fetchreviewSuccess,
  fetchreviewFailure,
  addReviewStart,
  addReviewSuccess,
  addReviewFailure,
} = reviewslice.actions;
export default reviewslice.reducer;