import { takeLatest, call, put } from "redux-saga/effects";

import { FETCH_POSTS_START } from "./actionTypes";

import { fetchPostsSuccess, fetchPostsFailure } from "./actions";

import { getAllPosts } from "services/postsService";

import convertArrayToMap from "utils/convertArrayToMap";

export function* fetchPostsStart() {
	yield takeLatest(FETCH_POSTS_START, fetchPostsStartAsync);
}

function* fetchPostsStartAsync() {
	try {
		const { data } = yield call(getAllPosts);
		yield put(fetchPostsSuccess(convertArrayToMap(data)));
	} catch (err) {
		yield put(fetchPostsFailure(err.message));
	}
}
