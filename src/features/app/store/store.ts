import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { uiReducer } from "@/features/ui/state/slice";
import { appConfig } from "@/config/app";
import * as nodeEnvConst from "@/const/node-env";

const isProduction = appConfig.nodeEnv === nodeEnvConst.PRODUCTION;

export const store = configureStore({
    reducer: {
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(logger),
    devTools: !isProduction,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
