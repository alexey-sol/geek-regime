import { appConfig } from "@/config/app";
import { getApiPath } from "@/shared/utils/formatters/api-path";

import type { GetAllPostsArg } from "./types";

const { apiPostsResource, apiPrefix } = appConfig;

const PAGE_OFFSET = 1;
const API_VERSION = 1;

export const postsBaseUrl = getApiPath(apiPrefix, API_VERSION, apiPostsResource);

export const transformGetAllPostsArg = (arg?: GetAllPostsArg): string | undefined => {
    if (arg) {
        const result: GetAllPostsArg = {
            ...arg,
            page: arg.page - PAGE_OFFSET,
        };

        return JSON.stringify(result);
    }

    return undefined;
};
