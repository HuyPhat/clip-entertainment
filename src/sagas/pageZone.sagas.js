import { call, put } from 'redux-saga/effects';
import PageZoneActions from '@reducers/hotZone.reducer';
import MusicZoneActions from '@reducers/musicZone.reducer';
import EZoneActions from '@reducers/eZone.reducer';
import EntertainmentZoneActions from '@reducers/entertainmentZone.reducer';

/* Hot Zone Process */
export function* requestPageZone(api, action) {
  //   const { code, profileID } = action;
  try {
    const response = yield call(api.getPage, { code: 'hot' });
    if (response.ok) {
      yield put(PageZoneActions.getPageZoneSuccess(response.data.data));
    } else {
      yield put(PageZoneActions.getPageZoneFailure(response.data.error));
    }
  } catch (error) {
    yield put(PageZoneActions.getPageZoneFailure(error));
  }
}

/* Music Zone Process */
export function* requestMusicZone(api, action) {
  try {
    const response = yield call(api.getPage, { code: 'music' });
    if (response.ok) {
      yield put(MusicZoneActions.getMusicZoneSuccess(response.data.data));
    } else {
      yield put(MusicZoneActions.getMusicZoneFailure(response.data.error));
    }
  } catch (error) {
    yield put(MusicZoneActions.getMusicZoneFailure(error));
  }
}

/* E Zone Process */
export function* requestEZone(api, action) {
  try {
    const response = yield call(api.getPage, { code: 'ezone' });
    if (response.ok) {
      yield put(EZoneActions.getEZoneSuccess(response.data.data));
    } else {
      yield put(EZoneActions.getEZoneFailure(response.data.error));
    }
  } catch (error) {
    yield put(EZoneActions.getEZoneFailure(error));
  }
}

/* Entertainment Zone Process */
export function* requestEntertainmentZone(api, action) {
  try {
    const response = yield call(api.getPage, { code: 'entertainment' });
    if (response.ok) {
      yield put(
        EntertainmentZoneActions.getEntertainmentZoneSuccess(response.data.data)
      );
    } else {
      yield put(
        EntertainmentZoneActions.getEntertainmentZoneFailure(
          response.data.error
        )
      );
    }
  } catch (error) {
    yield put(EntertainmentZoneActions.getEntertainmentZoneFailure(error));
  }
}
