import type { ConfigService } from "@nestjs/config";

import * as configs from "./config";
import * as constants from "./const";

export type AppConfig = {
    [constants.API_AGGREGATOR]: ReturnType<typeof configs.apiAggregatorConfig>;
    [constants.API_GATEWAY]: ReturnType<typeof configs.apiGatewayConfig>;
    [constants.API_POSTS]: ReturnType<typeof configs.apiPostsConfig>;
    [constants.API_USERS]: ReturnType<typeof configs.apiUsersConfig>;
    [constants.CLIENT_WEB]: ReturnType<typeof configs.clientWebConfig>;
    [constants.VALIDATION_PIPE]: ReturnType<typeof configs.validationPipeConfig>;
};

export type AppConfigService = ConfigService<AppConfig, true>;
