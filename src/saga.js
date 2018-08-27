/* global fetch */

import {
	delay
} from 'redux-saga';
import {
	all,
	call,
	put,
	take,
	takeLatest
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-fetch';

import {
	Login,
	Categories,
	Category,
	Topic,
	Account,
	Auth,
	History,
	Logs,
	Video,
	Playlist,
	Search,
	Register,
	ResetMessages,
	Facebook
} from '@tinorion1991/pops-tv-web-core';

es6promise.polyfill()

function* rootSaga() {
	yield all([
		takeLatest('RESET_MESSAGES', ResetMessages.resetMessages),
		// call(runClockSaga),
		takeLatest('VALIDATE_TOKEN', Auth.validateToken),

		takeLatest('LOGIN_BY_FACEBOOK', Login.loginByFacebookFetchData),
		takeLatest('LOGIN_BY_FACEBOOK_KIT', Login.loginByFacebookKitFetchData),
		takeLatest('LOGIN_BY_GOOGLE', Login.loginByGoogleFetchData),
		takeLatest('LOGIN_BY_ACCOUNT', Login.loginByAccount),
		takeLatest('LOGIN_ANONYMOUS', Login.loginAnonymous),

		takeLatest('REGISTER_EMAIL', Register.registerEmail),

		takeLatest('RESET_PASSWORD', Account.resetPassword),
		takeLatest('GET_PROFILES', Account.getProfiles),

		takeLatest('GET_CATEGORIES', Categories.getCategoriesFetchData),

		takeLatest('GET_HOME_CATEGORY_PLAYLIST', Category.getHomeCategoryPlaylist),
		takeLatest('GET_CATEGORY_PLAYLIST', Category.getCategoryPlaylist),

		takeLatest('GET_VIDEO_DETAILS', Video.getVideoDetails),
		takeLatest('GET_VIDEO_DETAILS_HAS_CDN', Video.getVideoDetailsHasCDN),
		takeLatest('GET_VIDEO_RELATED', Video.getVideoRelated),
		takeLatest('GET_VIDEO_RELATED_ANONYMOUS', Video.getVideoRelatedAnonymous),

		takeLatest('GET_VIDEO_LIST_BY_PLAYLIST', Playlist.getVideoListByPlaylist),

		takeLatest('GET_VIDEO_LIST_BY_HISTORY', History.getVideoListByHistory),
		takeLatest('ADD_VIDEO_TO_HISTORY', History.addVideoToHistory),

		takeLatest('SEARCH_VIDEOS', Search.searchVideos),

		takeLatest('VIDEO_LOGS_START', Logs.videoLogsStart),
		takeLatest('VIDEO_LOGS_UPDATE_VIEW', Logs.videoLogsUpdateView),
		takeLatest('VIDEO_LOGS_VIEWED', Logs.videoLogsViewed),
		takeLatest('VIDEO_LOGS_WATCHED', Logs.videoLogsWatched),

		takeLatest('GET_TOPICS_CHARACTER', Topic.getTopicsCharacter),
		takeLatest('GET_TOPICS_SHOW', Topic.getTopicsShow),
		takeLatest('GET_TOPIC_ITEMS', Topic.getTopicItems),

		takeLatest('GET_ACCESS_TOKEN_FBKIT', Facebook.getAccessTokenFBKit),

	])
}

export default rootSaga