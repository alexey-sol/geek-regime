import * as Joi from "joi";
import * as nodeEnvConst from "@/const/node-env";

export const envSchema = Joi.object({
    API_GATEWAY_HOST_EXTERNAL: Joi
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
    API_GATEWAY_VERSION: Joi
        .number()
        .default(1),
    CLIENT_WEB_HOST_EXTERNAL: Joi
        .string()
        .required(),
    CLIENT_WEB_PORT_EXTERNAL: Joi
        .number()
        .default(14000),
    JWT_EXPIRES_IN: Joi
        .string()
        .default("7d"),
    JWT_SECRET: Joi
        .string()
        .required(),
    NODE_ENV: Joi
        .string()
        .valid(nodeEnvConst.DEVELOPMENT, nodeEnvConst.PRODUCTION, nodeEnvConst.TEST)
        .default(nodeEnvConst.DEVELOPMENT),
});
