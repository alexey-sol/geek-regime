import { appConfig } from "@/config/app";

type NodeEnv = NodeJS.ProcessEnv["NODE_ENV"];

export const isProduction = (nodeEnv: NodeEnv = appConfig.nodeEnv) =>
    nodeEnv === "production";
