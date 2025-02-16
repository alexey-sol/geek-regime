import { type HasDisableFailureNotificationOnStatus } from "@/shared/types";
import { type ApiError, type ApiErrorDetail, type ErrorCode } from "@/shared/models/dtos";

export const hasDisableFailureNotificationOnStatus = (
    value: unknown,
): value is HasDisableFailureNotificationOnStatus => value instanceof Object
    && "disableFailureNotificationOnStatus" in value
    && typeof value.disableFailureNotificationOnStatus === "number";

type HasOriginalArgs<T> = {
    originalArgs: T;
};

export const hasOriginalArgs = <T>(
    value: unknown,
): value is HasOriginalArgs<T> => value instanceof Object && "originalArgs" in value;

type HasData<T> = {
    data: T;
};

export const hasData = <T>(value: unknown): value is HasData<T> => value instanceof Object
    && "data" in value;

const ERROR_CODES: ErrorCode[] = [
    "ABSENT", "ALREADY_EXISTS", "ALREADY_REMOVED", "INVALID", "MISMATCH",
];

export const isErrorCode = (value: unknown): value is ErrorCode => typeof value === "string"
    && ERROR_CODES.includes(value as ErrorCode);

export const isApiError = (value: unknown): value is ApiError => value instanceof Object
    && "status" in value
    && typeof value.status === "number"
    && "path" in value
    && typeof value.path === "string"
    && "message" in value
    && typeof value.message === "string"
    && "details" in value
    && Array.isArray(value.details)
    && "timestamp" in value
    && typeof value.timestamp === "string";

export const isApiErrorDetail = (value: unknown): value is ApiErrorDetail => value instanceof Object
    && "code" in value
    && isErrorCode(value.code)
    && "field" in value
    && typeof value.field === "string";

export const isFailureNotificationDisabled = (
    metaArg: unknown,
    responseStatus: number,
): boolean => hasOriginalArgs(metaArg)
    && hasDisableFailureNotificationOnStatus(metaArg.originalArgs)
    && metaArg.originalArgs.disableFailureNotificationOnStatus === responseStatus;
