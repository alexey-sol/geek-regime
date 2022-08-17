import * as Joi from "joi";
import { NodeEnv } from "@/shared/const/node-env";

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
    API_POSTS_HOST: Joi
        .string()
        .required(),
    API_POSTS_PORT: Joi
        .string()
        .required(),
    API_POSTS_RESOURCE: Joi
        .string()
        .required(),
    API_USERS_HOST: Joi
        .string()
        .required(),
    API_USERS_PORT: Joi
        .string()
        .required(),
    API_USERS_RESOURCE: Joi
        .string()
        .required(),
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
        .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION, NodeEnv.TEST)
        .default(NodeEnv.DEVELOPMENT),
});
