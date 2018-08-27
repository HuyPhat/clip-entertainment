/* reducer index.js */

// import { resettableReducer } from 'reduxsauce';
import { combineReducers } from 'redux';

// import hotZoneReducer from './hotZone.reducer';

// listen for the action type of 'RESET', you can change this.
// const resettable = resettableReducer('RESET');

export default combineReducers({
  hotZone: require('./hotZone.reducer').reducer,
  musicZone: require('./musicZone.reducer').reducer,
  eZone: require('./eZone.reducer').reducer,
  entertainmentZone: require('./entertainmentZone.reducer').reducer,
  video: require('./video.reducer').reducer
});
