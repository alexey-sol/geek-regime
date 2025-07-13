import {
    type SortValue, type HasDisableFailureNotificationOnStatus, type HasTitle,
} from "@/shared/types";
import {
    type PagePeriod, type ApiError, type ApiErrorDetail,
} from "@/shared/models/dtos";

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
    && typeof value.code === "string"
    && "field" in value
    && typeof value.field === "string";

export const isFailureNotificationDisabled = (
    metaArg: unknown,
    responseStatus: number,
): boolean => hasOriginalArgs(metaArg)
    && hasDisableFailureNotificationOnStatus(metaArg.originalArgs)
    && metaArg.originalArgs.disableFailureNotificationOnStatus === responseStatus;

export const hasTitle = (value: unknown): value is HasTitle => value instanceof Object
    && "title" in value;

const PERIOD_VALUES: PagePeriod[] = ["OVERALL", "DAY", "WEEK", "MONTH", "YEAR"];

export const isPeriodValue = (value: unknown): value is PagePeriod => typeof value === "string"
    && PERIOD_VALUES.includes(value as PagePeriod);

const SORT_VALUES: SortValue[] = ["LATEST", "OLDEST"];

export const isSortValue = (value: unknown): value is SortValue => typeof value === "string"
    && SORT_VALUES.includes(value as SortValue);
