import * as cg from "./config";
import * as ct from "./const";

export type AppConfig = {
    [ct.AUTH]: ReturnType<typeof cg.authConfig>;
    [ct.API_AGGREGATOR]: ReturnType<typeof cg.apiAggregatorConfig>;
    [ct.API_GATEWAY]: ReturnType<typeof cg.apiGatewayConfig>;
    [ct.API_POSTS]: ReturnType<typeof cg.apiPostsConfig>;
    [ct.API_USERS]: ReturnType<typeof cg.apiUsersConfig>;
    [ct.CLIENT_WEB]: ReturnType<typeof cg.clientWebConfig>;
    [ct.PROCESS]: ReturnType<typeof cg.processConfig>;
    [ct.VALIDATION_PIPE]: ReturnType<typeof cg.validationPipeConfig>;
};
