import { getApiPath } from "@/shared/utils/formatters/api-path";

import * as cn from "./const";

const API_VERSION = 1;

export const baseUrl = getApiPath(API_VERSION);

export const createTag = (id: string | number = cn.TAG_LIST_ID): {
    id: string | number;
    type: typeof cn.POSTS_TAG_TYPE;
} => ({
    id,
    type: cn.POSTS_TAG_TYPE,
});
