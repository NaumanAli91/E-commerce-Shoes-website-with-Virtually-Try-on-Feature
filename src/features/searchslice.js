// searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
     query: '',
    suggestions: [],
    productarray:[],
    productarrayfilter:[],
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    filterusers: (state, action) => {
      const { sizes, brands, conditions } = action.payload;
      console.log(action.payload);
      const filteredUsers = state.productarrayfilter.filter(user => (
        (sizes.length === 0 || sizes.includes(user.size)) &&
        (brands.length === 0 || brands.includes(user.brand)) &&
        (conditions.length === 0 || conditions.includes(user.shoecondition))
      ));
      state.productarray = filteredUsers;
    },
    setproductdata:(state,action) =>{
      console.log(action.payload);
      state.productarray=action.payload;
      state.productarrayfilter=action.payload;
    }
  },
});

export const { setSearchQuery,setproductdata,filterusers,setSuggestions } = searchSlice.actions;
export default searchSlice.reducer;
