import {
	FETCH_ACTIVE_THREADS,
	FETCHED_ACTIVE_THREADS_FAILURE,
	FETCHED_ACTIVE_THREADS_SUCCESS,
	SUBMIT_USER_LOGOUT,
	UPSERT_THREAD_SUCCESS
} from '../actions';

function activeThreads(state = [], action) {
	switch (action.type) {
		case FETCH_ACTIVE_THREADS:
		case FETCHED_ACTIVE_THREADS_FAILURE:
			return [];
		case FETCHED_ACTIVE_THREADS_SUCCESS:
			return action.data.threads;
		case UPSERT_THREAD_SUCCESS:
		case SUBMIT_USER_LOGOUT:
			return [];
		default:
			return state;
	}
}

export default activeThreads;
