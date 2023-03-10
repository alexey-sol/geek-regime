import type { AppConfig } from "@/config/types";

const API_VERSION = 1;

export const getUsersApiPath = (
    config: AppConfig["apiUsers"],
    apiVersion = API_VERSION,
) => `${config.baseUrl}/${config.prefix}/v${apiVersion}/${config.resource}`;
