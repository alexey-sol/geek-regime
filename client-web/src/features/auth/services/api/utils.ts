import { appConfig } from "@/config/app";
import { getApiPath } from "@/shared/utils/formatters/api-path";

const { apiPrefix } = appConfig;

const API_VERSION = 1;

export const authBaseUrl = getApiPath(apiPrefix, API_VERSION, "auth"); // TODO cauth to ct
