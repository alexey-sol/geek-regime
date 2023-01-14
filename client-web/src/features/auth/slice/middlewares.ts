import type { Middleware } from "@reduxjs/toolkit";

import type { RootReducer } from "@/app/store";

// TODO
export const authMiddlewares: Middleware<unknown, RootReducer>[] = [
    ({ dispatch, getState }) => (next) => (action): unknown => next(action),
];
