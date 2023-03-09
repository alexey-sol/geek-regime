import * as Joi from "joi";

type NodeEnv = NodeJS.ProcessEnv["NODE_ENV"];

const DEVELOPMENT: NodeEnv = "development";
const PRODUCTION: NodeEnv = "production";
const TEST: NodeEnv = "test";

// Each environment variable used either in Webpack config or in runtime, should
// be listed in the schema below.
export const envSchema = Joi.object({
    API_GATEWAY_HOST: Joi
        .string()
        .required(),
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
        .valid(DEVELOPMENT, PRODUCTION, TEST)
        .default(PRODUCTION),
});
