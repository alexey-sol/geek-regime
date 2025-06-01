import { combineReducers } from "@reduxjs/toolkit";

import { feedbackReducer } from "@/features/feedback/slice";
import { postsReducer } from "@/features/posts/slice";
import { spacesReducer } from "@/features/spaces/slice";
import { usersReducer } from "@/features/users/slice";

import { appApi } from "./api";

export const rootReducer = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
    feedback: feedbackReducer,
    posts: postsReducer,
    spaces: spacesReducer,
    users: usersReducer,
});
