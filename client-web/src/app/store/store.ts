import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { isProduction } from "@eggziom/geek-regime-js-utils";

import { rootReducer } from "./reducer";
import { appApi } from "./api";
import { appListener } from "./api/middlewares";

export const store = configureStore({
    devTools: !isProduction(process.env.NODE_ENV),
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .prepend(appListener.middleware)
        .concat(appApi.middleware),
} as const);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
