import { resources } from "@eggziom/geek-regime-js-utils";

import { type AppConfig } from "@/config/type";

const API_VERSION = 1;

export const getUsersApiPath = (
    config: AppConfig["apiUsers"],
    apiVersion = API_VERSION,
) => `${config.baseUrl}/api/v${apiVersion}/${resources.USERS}`;
