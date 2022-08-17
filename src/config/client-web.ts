import { registerAs } from "@nestjs/config";
import * as constants from "./config.const";

const { env } = process;

export const clientWebConfig = registerAs("clientWeb", () => ({
    baseUrl: `${constants.URL_SCHEME}://${env.CLIENT_WEB_HOST_EXTERNAL}:${
        env.CLIENT_WEB_PORT_EXTERNAL}`,
}));
