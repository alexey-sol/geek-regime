import { envSchema } from "../config.validation";

// This config isn't supposed to be used in runtime since dotenv-webpack doesn't
// allow to read the whole process.env. Doing so will break the app.
// Also, since this used in Webpack config, aliases (like "@/config") don't work.

const { error, value } = envSchema.validate(process.env, {
    stripUnknown: true,
});

if (error) {
    throw error;
}

export const envConfig = {
    apiPrefix: value.API_GATEWAY_PREFIX,
    apiUrl: `http://${value.API_GATEWAY_HOST}:${value.API_GATEWAY_PORT}`,
    appName: value.APP_NAME,
    clientHost: value.CLIENT_WEB_HOST,
    clientPort: value.CLIENT_WEB_PORT,
    clientPortExternal: value.CLIENT_WEB_PORT_EXTERNAL,
    nodeEnv: value.NODE_ENV,
    webSocketUrl: value.CLIENT_WEB_WEBSOCKET_URL,
};
