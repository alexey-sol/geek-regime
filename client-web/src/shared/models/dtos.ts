import type { components as common } from "@eggziom/geek-regime-js-utils/models/common-schemas-v1";
import type { components as post } from "@eggziom/geek-regime-js-utils/models/post-schemas-v1";

export type ApiError = common["schemas"]["ApiError"];

export type ErrorCode = common["schemas"]["ErrorCode"];

export type PagePeriod = post["schemas"]["PagePeriod"];

export type ApiErrorDetail = {
    code: ErrorCode;
    field: string;
};
