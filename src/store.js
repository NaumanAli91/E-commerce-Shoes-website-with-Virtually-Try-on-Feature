import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga.js/rootSaga';
import {persistReducer} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
// Import your slices
import getproduct from './features/getproductslice';
import productDetailsSlice from './features/productDetailslice';
import cartslice from './features/cartslice';
import modalSlice from './features/modalslice';
import Loginmodalslice from './features/Loginmodalslice';
import billingInformationSlice from './features/billinginformationslice';
import existingPhoneSlice from './features/existingphoneslice';
import searchSlice from './features/searchslice';
import storage from 'redux-persist/lib/storage';
import authslice from './features/authslice';
import reviewslice from './features/reviewslice';
import orderHistorySlice from './features/orderhistoryslice';
import virtualproductSlice from './features/virtual_try_room_slice';
import discountSlice from './features/DiscountSlice';
const persistConfig ={
  key:"root",
  version: 1,
  storage
}
const reducer=combineReducers({
  cart: cartslice,
  allproducts: getproduct,
  productdetail: productDetailsSlice,
  modal: modalSlice,
  loginmodal: Loginmodalslice,
  auth: authslice,
  billinginfo:billingInformationSlice,
  existingPhone:existingPhoneSlice,
  search: searchSlice,
  review:reviewslice,
  ordershistory:orderHistorySlice,
  virtualproduct:virtualproductSlice,
  discount:discountSlice,
 
});
const persistedReducer=persistReducer(persistConfig,reducer);
// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;



