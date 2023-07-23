import { appConfig } from "@/config/app";
import { getApiPath } from "@/shared/utils/formatters/api-path";

import * as cn from "./const";
import type { GetAllPostsArg } from "./types";

const { apiPrefix } = appConfig;

const PAGE_OFFSET = 1;
const API_VERSION = 1;

export const baseUrl = getApiPath(apiPrefix, API_VERSION);

export const transformPaging = (paging?: GetAllPostsArg["paging"]): string | undefined => {
    if (paging) {
        const result: GetAllPostsArg["paging"] = {
            ...paging,
            page: paging.page - PAGE_OFFSET,
        };

        return JSON.stringify(result);
    }

    return undefined;
};

export const createTag = (id: string | number = cn.TAG_LIST_ID): {
    id: string | number;
    type: typeof cn.POSTS_TAG_TYPE;
} => ({
    id,
    type: cn.POSTS_TAG_TYPE,
});
