import type { CreatePostOnSaveArg } from "./types";

export const isCreatePostOnSaveArg = (value: unknown): value is CreatePostOnSaveArg =>
    value instanceof Object && "title" in value && "body" in value;
