import { takeLatest, all } from 'redux-saga/effects';
import { PageZoneTypes } from '@reducers/hotZone.reducer';
import { MusicZoneTypes } from '@reducers/musicZone.reducer';
import { EZoneTypes } from '@reducers/eZone.reducer';
import { EntertainmentZoneTypes } from '@reducers/entertainmentZone.reducer';
import { VideoTypes } from '@reducers/video.reducer';
import {
  requestPageZone,
  requestMusicZone,
  requestEZone,
  requestEntertainmentZone
} from './pageZone.sagas';
import {
  requestVideoDetails
} from './video.sagas'
import api from '../api/index';

export default function* root() {
  yield all([
    takeLatest(PageZoneTypes.GET_PAGE_ZONE_REQUEST, requestPageZone, api),
    takeLatest(MusicZoneTypes.GET_MUSIC_ZONE_REQUEST, requestMusicZone, api),
    takeLatest(EZoneTypes.GET_E_ZONE_REQUEST, requestEZone, api),
    takeLatest(
      EntertainmentZoneTypes.GET_ENTERTAINMENT_ZONE_REQUEST,
      requestEntertainmentZone,
      api
    ),
    takeLatest(VideoTypes.GET_VIDEO_REQUEST, requestVideoDetails, api)
  ]);
}
