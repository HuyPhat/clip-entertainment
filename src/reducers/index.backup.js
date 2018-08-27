import * as _ from 'lodash';

function reducer (state = {}, action) {

	switch (action.type) {
		case 'RESET_MESSAGES':
			return {...state, resetMessages: action.data}

		case 'HAS_MESSAGES':
			return {...state, hasMessages: action.data}
		
		case 'IS_LOADING':
			return {...state, isLoading: action.data}

		case 'HAS_ERROR':
			if(_.isUndefined(action.err.message)){
				return {...state, hasErrored: action.err}
			}
			return {...state, hasErrored: action.err.message}

		case 'HAS_ERROR_SERVER':
			if(_.isUndefined(action.err.response)){
				return {...state, hasErroredServer: action.err}
			}
			
			return {...state, hasErroredServer: action.err.response.body.error}

		/**
		 * 
		 */
		case 'VALIDATE_TOKEN':
			return {...state, infoValidate: action.status}
			
		/**
		 * Login
		 */
		case 'LOGIN_BY_FACEBOOK_SUCCESS':
			return {...state, profile: action.data}

		case 'LOGIN_BY_FACEBOOK_KIT_SUCCESS':
			return {...state, profile: action.data}

		case 'LOGIN_BY_GOOGLE_SUCCESS':
			return {...state, profile: action.data}

		case 'LOGIN_BY_ACCOUNT_SUCCESS':
			return {...state, profile: action.data}

		case 'LOGIN_ANONYMOUS_SUCCESS':
			return {...state, profile: action.data}

		/**
		 * Account
		 */
		case 'RESET_PASSWORD_SUCCESS':
			return {...state, response: action.data}

		case 'GET_PROFILES_SUCCESS':
			return {...state, profiles: action.data}

		/**
		 * Category and Playlist
		 */
		case 'GET_CATEGORIES_SUCCESS':
			return {...state, categories: action.data.data}

		case 'GET_HOME_CATEGORY_PLAYLIST_SUCCESS':
			return {...state, category: action.data.data}

		case 'GET_CATEGORY_PLAYLIST_SUCCESS':
			return {...state, playlists: action.data.data}

		/**
		 * Videos
		 */
		case 'GET_VIDEO_LIST_BY_HISTORY_SUCCESS':
			return {...state, videosHistory: action.data}

		case 'ADD_VIDEO_TO_HISTORY_SUCCESS':
			return {...state, addHistoryResponse: action.data}

		case 'GET_VIDEO_LIST_BY_PLAYLIST_SUCCESS':
			return {...state, videos: action.data}

		case 'GET_VIDEO_DETAILS_SUCCESS':
			return {...state, video: action.data}

		case 'GET_VIDEO_DETAILS_HAS_CDN_SUCCESS':
			return {...state, videoCDN: action.data}

		case 'GET_VIDEO_RELATED_SUCCESS':
			return {...state, videoRelated: action.data}

		case 'GET_VIDEO_RELATED_ANONYMOUS_SUCCESS':
			return {...state, videoRelated: action.data}

		case 'SEARCH_VIDEOS_SUCCESS':
			return {...state, videosSearch: action.data}

		case 'ADD_VIDEO_LOGS_START_SUCCESS':
			return {...state, videoLogsStartResponse: action.data}

		case 'ADD_VIDEO_LOGS_UPDATE_VIEW_SUCCESS':
			return {...state, videoLogsUpdateViewResponse: action.data}

		case 'ADD_VIDEO_LOGS_VIEWED_SUCCESS':
			return {...state, videoLogsViewedResponse: action.data}

		case 'ADD_VIDEO_LOGS_WATCHED_SUCCESS':
			return {...state, videoLogsWatchedResponse: action.data}

		/**
		 * Topics
		 */
		case 'GET_TOPICS_CHARACTER_SUCCESS':
			return {...state, topicsCharacter: action.data}

		case 'GET_TOPICS_SHOW_SUCCESS':
			return {...state, topicsShow: action.data}

		case 'GET_TOPIC_ITEMS_SUCCESS':
			return {...state, topicItems: action.data}

		/**
		 * Facebook
		 */
		case 'GET_ACCESS_TOKEN_FBKIT_SUCCESS':
			return {...state, getAccessTokenFBKit: action.data}

		default:
			return state
	}
}

export default reducer