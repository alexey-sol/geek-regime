import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { setupListeners } from "@reduxjs/toolkit/query";

import { sessionReducer } from "@/features/session/slice/slice";
import sessionMiddlewares from "@/features/session/slice/middlewares";
import { postsApi } from "@/features/posts/services/api";
import { isProduction } from "@/shared/utils/helpers/env";

const rootReducer = combineReducers({
    [postsApi.reducerPath]: postsApi.reducer,
    session: sessionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(sessionMiddlewares)
        .concat(logger),
    devTools: !isProduction(),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
