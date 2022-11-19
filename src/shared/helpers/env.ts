import { appConfig } from "@/config/app";
import { NodeEnv } from "@/shared/types/env";
// TODO dep cycle with appConfig

export const isProduction = (nodeEnv: NodeEnv = appConfig.nodeEnv) =>
    nodeEnv === "production";
