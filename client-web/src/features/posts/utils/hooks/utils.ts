import type { CreatePostOnSaveArg } from "./types";

export const isCreatePostOnSaveArg = (value: unknown): value is CreatePostOnSaveArg => {
    if (!(value instanceof Object)) {
        return false;
    }

    const record = value as Record<string, unknown>;
    return typeof record.title === "string" && typeof record.body === "string";
};
