import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { isProduction } from "@eggziom/geek-regime-js-commons";

import { authApi } from "@/features/auth/services/api";
import { authListener } from "@/features/auth/slice/middlewares";
import { postsApi } from "@/features/posts/services/posts-api";
import { postCommentsApi } from "@/features/posts/services/post-comments-api";
import { usersApi } from "@/features/users/services/api";
import { postsListener } from "@/features/posts/slice/middlewares";

import { rootReducer } from "./reducer";

export const store = configureStore({
    devTools: !isProduction(process.env.NODE_ENV),
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .prepend(authListener.middleware)
        .prepend(postsListener.middleware)
        .concat(authApi.middleware)
        .concat(postsApi.middleware)
        .concat(postCommentsApi.middleware)
        .concat(usersApi.middleware),
} as const);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
