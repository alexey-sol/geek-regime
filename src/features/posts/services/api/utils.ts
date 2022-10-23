import { appConfig } from "@/config/app";
import { getApiPath } from "@/shared/utils/formatters/api-path";
import { GetAllPostsArg } from "./types";

const {
    apiPostsResource = "posts",
    apiPrefix = "api",
} = appConfig;

const pageOffset = 1;
const apiVersion = 1;

export const postsBaseUrl = getApiPath(apiPrefix, apiVersion, apiPostsResource);

export const transformGetAllPostsArg = (arg?: GetAllPostsArg): string | undefined => {
    if (arg) {
        const result: GetAllPostsArg = {
            ...arg,
            page: arg.page - pageOffset,
        };

        return JSON.stringify(result);
    }

    return undefined;
};
