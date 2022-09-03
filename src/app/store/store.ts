import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { postsReducer } from "@/features/posts/slice/slice";
import { appConfig } from "@/config/app";
import { NodeEnv } from "@/shared/const/node-env";
import { postsApi } from "@/features/posts/services/api";
import { setupListeners } from "@reduxjs/toolkit/query";

const isProduction = appConfig.nodeEnv === NodeEnv.PRODUCTION;

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        posts: postsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(logger),
    devTools: !isProduction,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
