import { getApiPath } from "@/shared/utils/formatters/api-path";

const API_VERSION = 1;

export const authBaseUrl = getApiPath(API_VERSION, "auth");
