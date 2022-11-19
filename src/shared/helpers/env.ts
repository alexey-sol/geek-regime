import { appConfig } from "@/config/app";
import { NodeEnv } from "@/shared/types/env";

export const isProduction = (nodeEnv: NodeEnv = appConfig.nodeEnv) =>
    nodeEnv === "production";
