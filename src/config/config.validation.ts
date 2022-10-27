import * as Joi from "joi";
import { NodeEnv } from "../shared/const";

// Each environment variable used either in Webpack config or in runtime, should
// be listed in the schema below.
export const envSchema = Joi.object({
    API_GATEWAY_HOST: Joi
        .string()
        .required(),
    API_GATEWAY_HOST_EXTERNAL: Joi
        .string()
        .default("0.0.0.0"),
    API_GATEWAY_PORT: Joi
        .number()
        .default(3000),
    API_GATEWAY_PORT_EXTERNAL: Joi
        .number()
        .default(13000),
    API_GATEWAY_PREFIX: Joi
        .string()
        .default("api"),
    API_POSTS_RESOURCE: Joi
        .string()
        .required(),
    API_USERS_RESOURCE: Joi
        .string()
        .required(),
    APP_NAME: Joi
        .string()
        .required(),
    CLIENT_WEB_HOST: Joi
        .string()
        .required(),
    CLIENT_WEB_PORT: Joi
        .number()
        .default(4000),
    CLIENT_WEB_PORT_EXTERNAL: Joi
        .number()
        .default(14000),
    CLIENT_WEB_WEBSOCKET_URL: Joi
        .string()
        .default("auto://0.0.0.0:0/ws"),
    NODE_ENV: Joi
        .string()
        .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION, NodeEnv.TEST)
        .default(NodeEnv.DEVELOPMENT),
    YANDEX_CLIENT_ID: Joi
        .string()
        .required(),
    YANDEX_OAUTH_URL: Joi
        .string()
        .default("https://oauth.yandex.ru/authorize"),
});
