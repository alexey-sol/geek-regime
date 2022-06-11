export const appConfig = {
    apiUrlExternal: `http://${process.env.API_GATEWAY_HOST_EXTERNAL}:${process.env.API_GATEWAY_PORT_EXTERNAL}`,
    appName: process.env.APP_NAME,
    nodeEnv: process.env.NODE_ENV,
};
