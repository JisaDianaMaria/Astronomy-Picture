import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchApod() {
  try {
    const response = yield call(axios.get, `https://api.nasa.gov/planetary/apod?api_key=aLg1jA9oyf4yOBQTchD4jJy1b5n1d0UrdDfrc3a7`);

    yield put({ type: 'FETCH_APOD_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_APOD_FAILURE', payload: error.message });
  }
}

function* apodSaga() {
  yield takeEvery('FETCH_APOD_REQUEST', fetchApod);
}

export default apodSaga;
