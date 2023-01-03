import { envSchema } from "./env.validation";

// This config isn't supposed to be used in runtime since dotenv-webpack doesn't
// allow to read the whole process.env. Doing so will break the app.

const { error, value } = envSchema.validate(process.env, {
    stripUnknown: true,
});

if (error) {
    throw error;
}

export const env = {
    apiPrefix: value.API_GATEWAY_PREFIX ?? "api",
    apiUrl: `http://${value.API_GATEWAY_HOST}:${value.API_GATEWAY_PORT}`,
    appName: value.APP_NAME,
    clientHost: value.CLIENT_WEB_HOST,
    clientPort: parseInt(value.CLIENT_WEB_PORT, 10),
    clientPortExternal: parseInt(value.CLIENT_WEB_PORT_EXTERNAL, 10),
    nodeEnv: value.NODE_ENV,
    webSocketUrl: value.CLIENT_WEB_WEBSOCKET_URL,
};
