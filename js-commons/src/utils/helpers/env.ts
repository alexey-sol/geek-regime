type NodeEnv = NodeJS.ProcessEnv["NODE_ENV"];

const PRODUCTION = "production";

export const isProduction = (nodeEnv: NodeEnv = process.env.NODE_ENV): boolean =>
    nodeEnv === PRODUCTION;
