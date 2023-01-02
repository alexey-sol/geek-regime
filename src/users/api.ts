import type { AppConfig } from "@/config/types";

const DEFAULT_API_VERSION = 1;

export const getUsersApiPath = (
    config: AppConfig["apiUsers"],
    apiVersion = DEFAULT_API_VERSION,
) => `${config.baseUrl}/${config.prefix}/v${apiVersion}/${config.resource}`;
