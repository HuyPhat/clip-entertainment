import { call, put } from 'redux-saga/effects';
import VideoActions from '@reducers/video.reducer';

/* Video Detail Saga */
export function* requestVideoDetails(api, action) {
    // console.log(action);
    try {
        const response = yield call(api.getVideoInfo, { videoId: action.videoId });
        // console.log(response);
        if (response.ok) {
            yield put(VideoActions.getVideoSuccess(response.data));
        } else {
            yield put(VideoActions.getVideoFailure(response.error));
        }
    } catch (error) {
        yield put(VideoActions.getVideoFailure(error));
    }
}