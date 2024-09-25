import { all } from 'redux-saga/effects';
import apodSaga from './apodSaga';
import gallerySaga from './gallerySaga';

export default function* rootSaga() {
  yield all([apodSaga(), gallerySaga()]);
}
