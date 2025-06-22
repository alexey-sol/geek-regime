import { IllegalArgumentError } from "@/shared/utils/errors";

const config = {
    appName: process.env.APP_NAME,
    nodeEnv: process.env.NODE_ENV,
};

type RawConfig = typeof config;
type Key = keyof RawConfig;
type Value = NonNullable<RawConfig[Key]>;
type AppConfig = Record<Key, Value>;

const isAppConfig = (item: unknown): item is AppConfig => item instanceof Object
    && Object.values(item).every((value) => value !== undefined);

if (!isAppConfig(config)) {
    throw new IllegalArgumentError("Config must not contain undefined values");
}

export const appConfig = config;
