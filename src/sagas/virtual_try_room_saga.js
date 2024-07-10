import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchEffectNameSuccess, fetchEffectNameFailure } from '../features/virtual_try_room_slice';

function* fetchProductEffectName(action) {
  try {
    const response = yield call(fetch, `http://api.dopes.online/api/productEffects/${action.payload}`);
    if (response.ok) {
      const effectName = yield response.text();
      yield put(fetchEffectNameSuccess(effectName));
    } else if (response.status === 404) {
      throw new Error('Product not found');
    } else {
      throw new Error('Internal Server Error');
    }
  } catch (error) {
    yield put(fetchEffectNameFailure(error.message));
  }
}

function* virtualproductSaga() {
  yield takeEvery('virtualproduct/setProductId', fetchProductEffectName);
}

export default virtualproductSaga;
