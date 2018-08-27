import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    getPageZoneRequest: ['code', 'profileID'],
    getPageZoneSuccess: ['data'],
    getPageZoneFailure: ['error']
  },
  { prefix: '@POPSTV@' }
);

/* export */
export const PageZoneTypes = Types;
export default Creators;

/* INITIAL STATE */
const DEFAULTSTATE = Immutable({
  requestStatus: 'idle',
  error: null,
  data: []
});

/* REDUCERS */
const getPageZoneRequest = (state, action) => {
  // console.log(state);
  return Immutable.merge(state, { requestStatus: 'loading' });
};
const getPageZoneRequestSuccess = (state, action) => {
  return Immutable.merge(state, { requestStatus: 'loaded', data: action.data });
  // return state.merge({ requesStatus: 'loaded', data: action.data });
};
const getPageZoneRequestFailure = (state, action) => {
  return Immutable.merge(state, {
    requestStatus: 'loaded',
    error: action.error
  });
  // return state.merge({ requesStatus: 'loaded', data: action.error });
};

/* Hookup Reducers To Types */
export const reducer = createReducer(DEFAULTSTATE, {
  [Types.GET_PAGE_ZONE_REQUEST]: getPageZoneRequest,
  [Types.GET_PAGE_ZONE_SUCCESS]: getPageZoneRequestSuccess,
  [Types.GET_PAGE_ZONE_FAILURE]: getPageZoneRequestFailure
});
