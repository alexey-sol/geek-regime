import { combineReducers } from "@reduxjs/toolkit";

import { authApi } from "@/features/auth/services/api";
import { postsApi } from "@/features/posts/services/api";
import { feedbackReducer } from "@/features/feedback/slice";
import { postsReducer } from "@/features/posts/slice";

export const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    feedback: feedbackReducer,
    posts: postsReducer,
});
