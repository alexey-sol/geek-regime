import path from "path";

import type { JestConfigWithTsJest } from "ts-jest";

import baseConfig from "./config.base";
import { transformOptions } from "./utils";

const config: JestConfigWithTsJest = {
    ...baseConfig,
    globals: {
        "babel-jest": {
            babelrcFile: path.resolve(__dirname, "..", "babel", "config.base.js"),
        },
    },
    testEnvironment: "jsdom",
    transform: {
        ...baseConfig.transform,
        [transformOptions.regExps.BABEL_CONFIG]: ["babel-jest", {
            configFile: transformOptions.defaults.BABEL_CONFIG,
        }],
    },
};

export default config;
