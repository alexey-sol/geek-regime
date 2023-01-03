import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { isProduction } from "@/shared/utils/helpers/env";
import { postsApi } from "@/features/posts/services/api";
import { postsReducer } from "@/features/posts/slice";
import { sessionReducer } from "@/features/session/slice";
import { sessionMiddlewares } from "@/features/session/slice/middlewares";

const rootReducer = combineReducers({
    [postsApi.reducerPath]: postsApi.reducer,
    posts: postsReducer,
    session: sessionReducer,
});

export const store = configureStore({
    devTools: !isProduction(),
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(postsApi.middleware)
        .concat(sessionMiddlewares),
} as const);

setupListeners(store.dispatch);

export type RootReducer = ReturnType<typeof rootReducer>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
