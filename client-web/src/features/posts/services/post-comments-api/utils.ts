import { getApiPath } from "@/shared/utils/formatters/api-path";

import * as cn from "./const";

const API_VERSION = 1;

export const baseUrl = getApiPath(API_VERSION);

export const createTag = (id: string | number): {
    id: string | number;
    type: typeof cn.POST_COMMENTS_TYPE;
} => ({
    id,
    type: cn.POST_COMMENTS_TYPE,
});
