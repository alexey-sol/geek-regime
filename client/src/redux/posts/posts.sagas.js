import { all, call, takeLatest } from "redux-saga/effects";

import * as types from "./posts.types";
import * as workers from "./posts.workers";

function * onCreatePostStart () {
    yield takeLatest(types.CREATE_POST_START, workers.doCreatePost);
}

function * onDeletePostStart () {
    yield takeLatest(types.DELETE_POST_START, workers.doDeletePost);
}

function * onFetchPostStart () {
    yield takeLatest(types.FETCH_POST_START, workers.doFetchPost);
}

function * onFetchPostsStart () {
    yield takeLatest(types.FETCH_POSTS_START, workers.doFetchPosts);
}

function * onIncrementViewCountStart () {
    yield takeLatest(types.INCREMENT_VIEW_COUNT_START, workers.doIncrementViewCount);
}

function * onSearchPostsStart () {
    yield takeLatest(types.SEARCH_POSTS_START, workers.doSearchPosts);
}

function * onUpdatePostStart () {
    yield takeLatest(types.UPDATE_POST_START, workers.doUpdatePost);
}

function * onVoteForPostStart () {
    yield takeLatest(types.VOTE_FOR_POST_START, workers.doVoteForPost);
}

function * postSagas () {
    yield all([
        call(onCreatePostStart),
        call(onDeletePostStart),
        call(onFetchPostStart),
        call(onFetchPostsStart),
        call(onIncrementViewCountStart),
        call(onSearchPostsStart),
        call(onUpdatePostStart),
        call(onVoteForPostStart)
    ]);
}

export default postSagas;
