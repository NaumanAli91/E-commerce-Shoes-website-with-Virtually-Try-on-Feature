// sagas.js
import { put, call,takeEvery } from 'redux-saga/effects';
import { addToCartSuccess,
addToCartFailure,
incrementQuantitySuccess,
incrementQuantityFailure,
decrementQuantitySuccess,
decrementQuantityFailure,
removeFromCartSuccess,
removeFromCartFailure } from '../features/cartslice';
function* fetchDataaddToCart(action) {
  try {
    yield put(addToCartSuccess(action.payload));
  } catch (error) {
    yield put(addToCartFailure(error.message));
  }
}
function* fetchDataincrementQuantity(action) {
    try {  
      yield put(incrementQuantitySuccess(action.payload));
    } catch (error) {
      yield put(incrementQuantityFailure(error.message));
    }
  } 
function* fetchDatadecrementQuantity(action) {
    try {
      
      yield put(decrementQuantitySuccess(action.payload));
    } catch (error) {
      yield put(decrementQuantityFailure(error.message));
    }
  }
function* fetchDataremoveFromCart(action) {
    try {
      
      yield put(removeFromCartSuccess(action.payload));
    } catch (error) {
      yield put(removeFromCartFailure(error.message));
    }
  }
  
export function* watchCartActions() {
  yield takeEvery('cart/addToCartStart',fetchDataaddToCart);
  yield takeEvery('cart/incrementQuantityStart',fetchDataincrementQuantity);
  yield takeEvery('cart/decrementQuantityStart',fetchDatadecrementQuantity);
  yield takeEvery('cart/removeFromCartStart',fetchDataremoveFromCart);
}
export default watchCartActions;