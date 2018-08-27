import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    getVideoRequest: ['videoId'],
    getVideoSuccess: ['data'],
    getVideoFailure: ['error'],
    setCurrentVideoPlaying: ['video']
  },
  { prefix: '@POPSTV@' }
);

/* export */
export const VideoTypes = Types;
export default Creators;

/* INITIAL STATE */
const DEFAULT_STATE = Immutable({
  requestStatus: 'idle',
  error: null,
  data: null,
  currentVideoPlaying: null
});

/* REDUCERS */
const getVideoInfoRequest = (state, action) => {
  return Immutable.merge(state, { requestStatus: 'loading' });
};
const getVideoInfoSuccess = (state, action) => {
  return Immutable.merge(state, { requestStatus: 'loaded', data: action.data });
};
const getVideoInfoFailure = (state, action) => {
  return Immutable.merge(state, {
    requestStatus: 'loaded',
    error: action.error
  });
};
const setCurrentVideoPlaying = (state, action) => {
  // localStorage.setItem('popstv-current-playing-video', JSON.stringify(action.video))
  return Immutable.merge(state, {
    currentVideoPlaying: action.video
  })
}

/* Hookup Reducers To Types */
export const reducer = createReducer(DEFAULT_STATE, {
  [VideoTypes.GET_VIDEO_REQUEST]: getVideoInfoRequest,
  [VideoTypes.GET_VIDEO_SUCCESS]: getVideoInfoSuccess,
  [VideoTypes.GET_VIDEO_FAILURE]: getVideoInfoFailure,
  [VideoTypes.SET_CURRENT_VIDEO_PLAYING]: setCurrentVideoPlaying,
});
