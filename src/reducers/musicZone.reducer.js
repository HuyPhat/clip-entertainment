import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    getMusicZoneRequest: null,
    getMusicZoneSuccess: ['data'],
    getMusicZoneFailure: ['error']
  },
  { prefix: '@POPSTV@' }
);

/* export */
export const MusicZoneTypes = Types;
export default Creators;

/* INITIAL STATE */
const DEFAULT_STATE = Immutable({
  requestStatus: 'idle',
  error: null,
  data: []
});

/* REDUCERS */
const getMusicZoneRequest = (state, action) => {
  return Immutable.merge(state, { requestStatus: 'loading' });
};
const getMusicZoneRequestSuccess = (state, action) => {
  return Immutable.merge(state, { requestStatus: 'loaded', data: action.data });
  // return state.merge({ requesStatus: 'loaded', data: action.data });
};
const getMusicZoneRequestFailure = (state, action) => {
  return Immutable.merge(state, {
    requestStatus: 'loaded',
    error: action.error
  });
  // return state.merge({ requesStatus: 'loaded', data: action.error });
};

/* Hookup Reducers To Types */
export const reducer = createReducer(DEFAULT_STATE, {
  [Types.GET_MUSIC_ZONE_REQUEST]: getMusicZoneRequest,
  [Types.GET_MUSIC_ZONE_SUCCESS]: getMusicZoneRequestSuccess,
  [Types.GET_MUSIC_ZONE_FAILURE]: getMusicZoneRequestFailure
});
