// searchSaga.js
import { put, takeEvery, call } from 'redux-saga/effects';
import { setproductdata,setSearchQuery,setSuggestions } from '../features/searchslice';

const searchApi = 'http://api.dopes.online/api/search_products';
const findApi = 'http://api.dopes.online/api/find_products';

function* handleSearch(action) {
  try {
    const response = yield call(fetch, `${searchApi}?query=${action.payload}`);
    const result = yield call([response, 'json']);
    yield put(setSuggestions(result));
  } catch (error) {
    // Handle error, if any
    console.error('Error fetching search suggestions:', error);
  }
}
function* handlefindproducts(action) {
  try {
    const response = yield call(fetch, `${findApi}?query=${action.payload}`);
    const result = yield call([response, 'json']);
    yield put(setproductdata(result));
  } catch (error) {
    console.error('Error fetching search results:', error);
    // Handle error, e.g., dispatch an action to set an error state in the store
  }
}

export function* watchSearch() {
  yield takeEvery(setSearchQuery.type, handleSearch);
  yield takeEvery(setSearchQuery.type, handlefindproducts); // Watch for setSearchQuery action
}