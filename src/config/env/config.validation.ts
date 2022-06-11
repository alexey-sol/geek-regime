import * as Joi from "joi";
import * as nodeEnvConst from "../../const/node-env";

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
        .valid(nodeEnvConst.DEVELOPMENT, nodeEnvConst.PRODUCTION, nodeEnvConst.TEST)
        .default(nodeEnvConst.DEVELOPMENT),
});
