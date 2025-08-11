import { type FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import httpStatus from "http-status";

import * as cn from "./const";
import type * as tp from "./types";

import { type UserResponse } from "@/features/users/models/dtos";

export const createTag = (): {
    type: typeof cn.PROFILE_TYPE;
} => ({
    type: cn.PROFILE_TYPE,
});

export const transformAuthResponse = (
    response: UserResponse,
    meta?: FetchBaseQueryMeta,
): tp.AuthResponse => ({
    confirmation: meta?.response?.status === httpStatus.ACCEPTED ? "email" : undefined,
    profile: response ?? undefined,
});
