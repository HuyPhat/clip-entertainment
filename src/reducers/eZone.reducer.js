import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    getEZoneRequest: null,
    getEZoneSuccess: ['data'],
    getEZoneFailure: ['error']
  },
  { prefix: '@POPSTV@' }
);

/* export */
export const EZoneTypes = Types;
export default Creators;

/* INITIAL STATE */
const DEFAULT_STATE = Immutable({
  requestStatus: 'idle',
  error: null,
  data: []
});

/* REDUCERS */
const getEZoneRequest = (state, action) => {
  return Immutable.merge(state, { requestStatus: 'loading' });
};
const getEZoneRequestSuccess = (state, action) => {
  return Immutable.merge(state, { requestStatus: 'loaded', data: action.data });
  // return state.merge({ requesStatus: 'loaded', data: action.data });
};
const getEZoneRequestFailure = (state, action) => {
  return Immutable.merge(state, {
    requestStatus: 'loaded',
    error: action.error
  });
  // return state.merge({ requesStatus: 'loaded', data: action.error });
};

/* Hookup Reducers To Types */
export const reducer = createReducer(DEFAULT_STATE, {
  [Types.GET_E_ZONE_REQUEST]: getEZoneRequest,
  [Types.GET_E_ZONE_SUCCESS]: getEZoneRequestSuccess,
  [Types.GET_E_ZONE_FAILURE]: getEZoneRequestFailure
});
