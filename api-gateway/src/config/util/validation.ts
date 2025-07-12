import * as process from "node:process";

import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    validateSync,
} from "class-validator";
import { Optional } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { NodeEnv } from "@/shared/const";

import { InvalidConfigException } from "./exception";

class EnvironmentVariables {
    @IsString()
    @IsNotEmpty()
    API_AGGREGATOR_HOST: string;

    @IsInt()
    @IsNotEmpty()
    API_AGGREGATOR_PORT: number;

    @IsString()
    @IsNotEmpty()
    API_GATEWAY_HOST_EXTERNAL: string;

    @IsInt()
    API_GATEWAY_PORT: number;

    @IsInt()
    API_GATEWAY_PORT_EXTERNAL: number;

    @IsString()
    @IsNotEmpty()
    API_POSTS_HOST: string;

    @IsInt()
    API_POSTS_PORT: number;

    @IsString()
    @IsNotEmpty()
    API_USERS_HOST: string;

    @IsInt()
    API_USERS_PORT: number;

    @IsString()
    @IsNotEmpty()
    APP_NAME: string;

    @IsString()
    @IsNotEmpty()
    CLIENT_WEB_HOST_EXTERNAL: string;

    @IsInt()
    @Optional()
    CLIENT_WEB_PORT_EXTERNAL: number = 14000;

    @IsString()
    @IsNotEmpty()
    @Optional()
    JWT_EXPIRES_IN: string = "1d";

    @IsString()
    @IsNotEmpty()
    JWT_SECRET: string;

    @IsString()
    @IsNotEmpty()
    MAILER_API_KEY: string;

    @IsString()
    @IsNotEmpty()
    MAILER_ENDPOINT: string;

    @IsString()
    @IsNotEmpty()
    MAILER_SENDER_EMAIL: string;

    @IsEnum(NodeEnv)
    @Optional()
    NODE_ENV: NodeEnv = NodeEnv.PRODUCTION;

    @IsString()
    @IsNotEmpty()
    YANDEX_CLIENT_ID: string;

    @IsString()
    @IsNotEmpty()
    YANDEX_CLIENT_SECRET: string;
}

export const validate = (config: Record<string, unknown>) => {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new InvalidConfigException(errors.toString());
    }

    return validatedConfig;
};

export const validatedEnv = validate(process.env);
