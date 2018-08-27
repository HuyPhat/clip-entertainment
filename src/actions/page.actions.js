import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions(
  {
    getPageZoneRequest: ['code', 'profileID'],
    getPageZoneSuccess: ['data'],
    getPageZoneFailure: ['error']
  },
  { prefix: '@POPSTV--' }
);

export { Types };
export default Creators;
