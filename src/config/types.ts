import * as cfg from "./config";
import * as cns from "./const";

export type AppConfig = {
    [cns.AUTH]: ReturnType<typeof cfg.authConfig>;
    [cns.API_AGGREGATOR]: ReturnType<typeof cfg.apiAggregatorConfig>;
    [cns.API_GATEWAY]: ReturnType<typeof cfg.apiGatewayConfig>;
    [cns.API_POSTS]: ReturnType<typeof cfg.apiPostsConfig>;
    [cns.API_USERS]: ReturnType<typeof cfg.apiUsersConfig>;
    [cns.CLIENT_WEB]: ReturnType<typeof cfg.clientWebConfig>;
    [cns.VALIDATION_PIPE]: ReturnType<typeof cfg.validationPipeConfig>;
};
