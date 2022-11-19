import { InvalidConfigError } from "@/shared/utils/errors";

const config = {
    apiPostsResource: process.env.API_POSTS_RESOURCE,
    apiPrefix: process.env.API_GATEWAY_PREFIX ?? "api",
    apiUrlExternal: `http://${process.env.API_GATEWAY_HOST_EXTERNAL}:${
        process.env.API_GATEWAY_PORT_EXTERNAL}`,
    apiUsersResource: process.env.API_USERS_RESOURCE,
    appName: process.env.APP_NAME,
    nodeEnv: process.env.NODE_ENV,
    yandexOauthUrl: process.env.YANDEX_OAUTH_URL,
    yandexClientId: process.env.YANDEX_CLIENT_ID,
};

type RawConfig = typeof config;
type Key = keyof RawConfig;
type Value = NonNullable<RawConfig[Key]>;
type AppConfig = Record<Key, Value>;

const isAppConfig = (item: unknown): item is AppConfig => item instanceof Object
    && Object.values(item).every((value) => value !== undefined);

if (!isAppConfig(config)) {
    throw new InvalidConfigError("App config contains undefined values");
}

export const appConfig = config;
