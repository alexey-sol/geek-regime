import { getApiPath } from "@/shared/utils/formatters/api-path";

import * as cn from "./const";

const API_VERSION = 1;

export const baseUrl = getApiPath(API_VERSION);

export const createTag = (id: string | number = cn.POST_LIST_ID): {
    id: string | number;
    type: typeof cn.POSTS_TYPE;
} => ({
    id,
    type: cn.POSTS_TYPE,
});
