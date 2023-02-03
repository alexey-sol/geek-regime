import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { isProduction } from "@/shared/utils/helpers/env";
import { authApi } from "@/features/auth/services/api";
import { authMiddlewares } from "@/features/auth/slice/middlewares";
import { postsApi } from "@/features/posts/services/api";
import { postsReducer } from "@/features/posts/slice";
import { uiReducer } from "@/features/ui/slice";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    posts: postsReducer,
    ui: uiReducer,
});

export const store = configureStore({
    devTools: !isProduction(),
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(postsApi.middleware)
        .concat(authMiddlewares),
} as const);

setupListeners(store.dispatch);

export type RootReducer = ReturnType<typeof rootReducer>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
