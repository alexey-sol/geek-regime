import type { components as common } from "@eggziom/geek-regime-js-commons/dist/models/common-schemas-v1";

export type ApiError = common["schemas"]["ApiError"];

export type ErrorCode = common["schemas"]["ErrorCode"];

export type ApiErrorDetail = {
    code: ErrorCode;
    field: string;
};
