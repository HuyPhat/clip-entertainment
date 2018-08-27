import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    getEntertainmentZoneRequest: null,
    getEntertainmentZoneSuccess: ['data'],
    getEntertainmentZoneFailure: ['error']
  },
  { prefix: '@POPSTV@' }
);

/* export */
export const EntertainmentZoneTypes = Types;
export default Creators;

/* INITIAL STATE */
const DEFAULT_STATE = Immutable({
  requestStatus: 'idle',
  error: null,
  data: []
});

/* REDUCERS */
const getEntertainmentZoneRequest = (state, action) => {
  return Immutable.merge(state, { requestStatus: 'loading' });
};
const getEntertainmentZoneSuccess = (state, action) => {
  return Immutable.merge(state, { requestStatus: 'loaded', data: action.data });
  // return state.merge({ requesStatus: 'loaded', data: action.data });
};
const getEntertainmentZoneFailure = (state, action) => {
  return Immutable.merge(state, {
    requestStatus: 'loaded',
    error: action.error
  });
  // return state.merge({ requesStatus: 'loaded', data: action.error });
};

/* Hookup Reducers To Types */
export const reducer = createReducer(DEFAULT_STATE, {
  [Types.GET_ENTERTAINMENT_ZONE_REQUEST]: getEntertainmentZoneRequest,
  [Types.GET_ENTERTAINMENT_ZONE_SUCCESS]: getEntertainmentZoneSuccess,
  [Types.GET_ENTERTAINMENT_ZONE_FAILURE]: getEntertainmentZoneFailure
});
