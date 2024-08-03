export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const SET_MATCHED_SEGMENTS = 'SET_MATCHED_SEGMENTS';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';
export const SET_ERROR = 'SET_ERROR';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const setMatchedSegments = (segments) => ({
  type: SET_MATCHED_SEGMENTS,
  payload: segments,
});

export const setActiveTab = (tab) => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
});

export const setCurrentTime = (time) => ({
  type: SET_CURRENT_TIME,
  payload: time,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
