import type { Middleware } from "@reduxjs/toolkit";

import type { RootReducer } from "@/app/store";

// TODO
export const sessionMiddlewares: Middleware<unknown, RootReducer>[] = [
    ({ dispatch, getState }) => (next) => (action): unknown => next(action),
];
