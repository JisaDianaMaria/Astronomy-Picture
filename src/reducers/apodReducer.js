  const initialState = {
    data: null,
    loading: false,
    error: null,
  };
  
  const apodReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_APOD_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_APOD_SUCCESS':
        return { ...state, data: action.payload, loading: false };
      case 'FETCH_APOD_FAILURE':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default apodReducer;
  