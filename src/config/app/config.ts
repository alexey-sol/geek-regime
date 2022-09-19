export const appConfig = {
    apiPrefix: process.env.API_GATEWAY_PREFIX,
    apiUrlExternal: `http://${process.env.API_GATEWAY_HOST_EXTERNAL}:${
        process.env.API_GATEWAY_PORT_EXTERNAL}`,
    appName: process.env.APP_NAME,
    nodeEnv: process.env.NODE_ENV,
    apiPostsResource: process.env.API_POSTS_RESOURCE,
    apiUsersResource: process.env.API_USERS_RESOURCE,
};
