import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

// TODO
export const mapper: Middleware<unknown, RootState> = ({ dispatch, getState }) =>
    (next) => (action): unknown => next(action);

export default [mapper];
