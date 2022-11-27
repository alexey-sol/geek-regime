import { Middleware } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";

// TODO
export const sessionMiddlewares: Middleware<unknown, RootState>[] = [
    ({ dispatch, getState }) => (next) => (action): unknown => next(action),
];
