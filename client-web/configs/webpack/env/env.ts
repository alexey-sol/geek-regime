import { config as dotenvConfig } from "dotenv";

import { envSchema } from "./env.validation";

dotenvConfig({ path: ".env" });

// This config isn't supposed to be used in runtime since dotenv-webpack doesn't
// allow to read the whole process.env. Doing so will break the app.

const { error, value } = envSchema.validate(process.env, {
    stripUnknown: true,
});

if (error) {
    throw error;
}

export const env = {
    apiPrefix: value.API_GATEWAY_PREFIX,
    appName: value.APP_NAME,
    nodeEnv: value.NODE_ENV,
    stub: {
        apiUrl: `http://${value.API_GATEWAY_HOST}:${value.API_GATEWAY_PORT}`,
        host: value.CLIENT_WEB_HOST,
        port: parseInt(value.CLIENT_WEB_PORT, 10),
        webSocketUrl: value.CLIENT_WEB_WEBSOCKET_URL,
    },
} as const;
