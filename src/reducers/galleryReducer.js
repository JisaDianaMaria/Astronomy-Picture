import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
  data: {},   
  favorites: [],   
  favoritesData: {},  
  error: null,
  loading: false,
};

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_GALLERY_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_GALLERY_SUCCESS': {
      const newData = action.payload.reduce((acc, item) => {
        acc[item.date] = item;
        return acc;
      }, {});

      const newFavoritesData = Object.values(newData).reduce((acc, item) => {
        if (state.favorites.includes(item.date)) {
          acc[item.date] = item;
        }
        return acc;
      }, {});

      return { 
        ...state, 
        data: { ...state.data, ...newData },  
        favoritesData: { ...state.favoritesData, ...newFavoritesData },  
        loading: false 
      };
    }

    case 'FETCH_GALLERY_FAILURE':
      return { ...state, error: action.payload, loading: false };

    case 'TOGGLE_FAVORITE': {
      const isFavorite = state.favorites.includes(action.payload);
      const updatedFavorites = isFavorite
        ? state.favorites.filter((date) => date !== action.payload)
        : [...state.favorites, action.payload];

      AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      const newFavoritesData = isFavorite
        ? { ...state.favoritesData }
        : { ...state.favoritesData, [action.payload]: state.data[action.payload] };

      if (isFavorite) {
        delete newFavoritesData[action.payload];
      }

      return {
        ...state,
        favorites: updatedFavorites,
        favoritesData: newFavoritesData,  
      };
    }

    case 'FETCH_FAVORITES_SUCCESS':
      return {
        ...state,
        favorites: Array.isArray(action.payload) ? action.payload : [],
      };

    default:
      return state;
  }
};

export default galleryReducer;