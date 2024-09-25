import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGallery(action) {
  const { dates } = action.payload;

  try {
    const promises = dates.map((date) =>
      axios.get(`https://api.nasa.gov/planetary/apod?api_key=aLg1jA9oyf4yOBQTchD4jJy1b5n1d0UrdDfrc3a7&date=${date}`)
    );
    const responses = yield Promise.all(promises);
    const photos = responses.map(response => response.data);
    yield put({ type: 'FETCH_GALLERY_SUCCESS', payload: photos });
  } catch (error) {
    yield put({ type: 'FETCH_GALLERY_FAILURE', payload: error.message });
  }
}

function* gallerySaga() {
  yield takeEvery('FETCH_GALLERY_REQUEST', fetchGallery);
}

export default gallerySaga;
