import { registerAs } from "@nestjs/config";
import * as constants from "./config.const";

const { env } = process;

export const apiPostsConfig = registerAs("apiPosts", () => ({
    baseUrl: `${constants.URL_SCHEME}://${env.API_POSTS_HOST}:${env.API_POSTS_PORT}`,
    resource: env.API_POSTS_RESOURCE,
}));
