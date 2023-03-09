import type { HasHttpStatus } from "js-commons/src/types/props";

export const hasHttpStatus = (value: unknown): value is HasHttpStatus => value instanceof Object
    && typeof (value as Record<string, unknown>).status === "number";
