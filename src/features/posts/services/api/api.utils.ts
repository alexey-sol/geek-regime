import { appConfig } from "@/config/app";
import { getApiPath } from "@/shared/utils/formatters/get-api-path";

const {
    apiPostsResource = "posts",
    apiPrefix = "api",
} = appConfig;

const apiVersion = 1;

export const postsBaseUrl = getApiPath(apiPrefix, apiVersion, apiPostsResource);
