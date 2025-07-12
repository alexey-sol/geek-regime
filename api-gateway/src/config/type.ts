import * as cf from "./config";
import * as ct from "./const";

export type AppConfig = {
    [ct.AUTH]: ReturnType<typeof cf.authConfig>;
    [ct.API_AGGREGATOR]: ReturnType<typeof cf.apiAggregatorConfig>;
    [ct.API_GATEWAY]: ReturnType<typeof cf.apiGatewayConfig>;
    [ct.API_POSTS]: ReturnType<typeof cf.apiPostsConfig>;
    [ct.API_USERS]: ReturnType<typeof cf.apiUsersConfig>;
    [ct.CLIENT_WEB]: ReturnType<typeof cf.clientWebConfig>;
    [ct.MAILER]: ReturnType<typeof cf.mailerConfig>;
    [ct.PROCESS]: ReturnType<typeof cf.processConfig>;
    [ct.VALIDATION_PIPE]: ReturnType<typeof cf.validationPipeConfig>;
};
