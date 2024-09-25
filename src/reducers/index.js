import { combineReducers } from 'redux';
import apodReducer from './apodReducer';
import galleryReducer from './galleryReducer';

export default combineReducers({
  apod: apodReducer,
  gallery: galleryReducer,
});
