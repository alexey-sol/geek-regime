import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { setupListeners } from "@reduxjs/toolkit/query";

import { isProduction } from "@/shared/utils/helpers/env";
import { postsApi } from "@/features/posts/services/api";
import { postsReducer } from "@/features/posts/slice";
import { sessionMiddlewares } from "@/features/session/slice/middlewares";
import { sessionReducer } from "@/features/session/slice";

const rootReducer = combineReducers({
    [postsApi.reducerPath]: postsApi.reducer,
    posts: postsReducer,
    session: sessionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    devTools: !isProduction(),
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(postsApi.middleware)
        .concat(sessionMiddlewares)
        .concat(logger),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
