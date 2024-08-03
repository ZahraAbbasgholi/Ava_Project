import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    SET_MATCHED_SEGMENTS,
    SET_ACTIVE_TAB,
    SET_CURRENT_TIME,
    SET_ERROR,
  } from './actions';
  
  const initialState = {
    results: [],
    loading: false,
    error: null,
    matchedSegments: [],
    activeTab: 'simple',
    currentTime: 0,
    matchedItem: null,
  };
  
  const textItemReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_DATA_SUCCESS:
        return {
          ...state,
          results: action.payload,
          loading: false,
        };
      case FETCH_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case SET_MATCHED_SEGMENTS:
        return {
          ...state,
          matchedSegments: action.payload,
        };
      case SET_ACTIVE_TAB:
        return {
          ...state,
          activeTab: action.payload,
        };
      case SET_CURRENT_TIME:
        return {
          ...state,
          currentTime: action.payload,
        };
      case SET_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default textItemReducer;
  