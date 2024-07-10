import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from '../features/getproductslice';

function* fetchData(action) {
  try {
    const { category, subcategory } = action.payload;
    let url;
    if (subcategory) {
      // If subcategory is provided, fetch products by subcategory
      url = `http://api.dopes.online/api/products/${subcategory}`;
    } else {
      // If subcategory is not provided, fetch products based on category
      url = category === 'men' ? 'http://api.dopes.online/api/products_list_mens' : 'http://api.dopes.online/api/products_list_womens';
    }
    const response = yield call(fetch, url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const result = yield call([response, 'json']);
    yield put(fetchDataSuccess(result));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchData() {
  yield takeEvery('getproduct/fetchDataStart', fetchData);
}
