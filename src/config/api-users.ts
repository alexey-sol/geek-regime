import { registerAs } from "@nestjs/config";
import * as constants from "./config.const";

const { env } = process;

export const apiUsersConfig = registerAs("apiUsers", () => ({
    baseUrl: `${constants.URL_SCHEME}://${env.API_USERS_HOST}:${env.API_USERS_PORT}`,
    resource: env.API_USERS_RESOURCE,
}));
