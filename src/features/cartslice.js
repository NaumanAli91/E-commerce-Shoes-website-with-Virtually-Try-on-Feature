import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    count: 0,
    loading: false,
    error: null,
    totalAmount: 0,
    subtotal: 0,
  },
  reducers: {
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },
    addToCartStart: (state) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      const { productid } = action.payload;

      const existingProductIndex = state.products.findIndex(
        (product) => product.productid === productid
      );

      if (existingProductIndex >= 0) {
        state.products[existingProductIndex].quantity += 1;
        state.count += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        state.count += 1;
      }
    },
    addToCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
 


incrementQuantityStart: (state) => {
  state.loading = true;
},
    incrementQuantitySuccess: (state, action) => {
  const product = state.products.find(
    (product) => product.productid === action.payload
  );
  if (product) {
    // Increment quantity
    product.quantity += 1;
    state.count += 1;
  }
          },
    incrementQuantityFailure: (state, action) => {
  state.loading = false;
  state.error = action.payload;
},



 decrementQuantityStart: (state) => {
  state.loading = true;
},
 decrementQuantitySuccess: (state, action) => {
  const product = state.products.find(
    (product) => product.productid === action.payload
  );
  if (product && product.quantity > 1) {
    // If quantity is greater than 1, decrement
    product.quantity -= 1;
    state.count -= 1;
  }
  else if(product.quantity==1){
    state.products = state.products.filter(
      (product) => product.productid !== action.payload
    );
    // Update the total count based on the remaining products
    state.count = state.products.reduce(
      (count, product) => count + product.quantity,
      0
    );
  }
  },
 decrementQuantityFailure: (state, action) => {
   state.loading = false;
   state.error = action.payload;
 },
      

removeFromCartStart: (state) => {
  state.loading = true;
},
removeFromCartSuccess: (state, action) => {
 
state.products = state.products.filter(
  (product) => product.productid !== action.payload
);
// Update the total count based on the remaining products
state.count = state.products.reduce(
  (count, product) => count + product.quantity,
  0
);
},
removeFromCartFailure: (state, action) => {
state.loading = false;
state.error = action.payload;
},


resetCart: (state) => {
  state.products = [];
  state.count = 0;
  state.loading = false;
  state.error = null;
  state.totalAmount = 0;
  state.subtotal = 0;
},
  },
});

export const {
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  incrementQuantityStart,
  incrementQuantitySuccess,
  incrementQuantityFailure,
  decrementQuantityStart,
  decrementQuantitySuccess,
  decrementQuantityFailure,
  removeFromCartStart,
  removeFromCartSuccess,
  removeFromCartFailure,
  setTotalAmount,
  setSubtotal,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
