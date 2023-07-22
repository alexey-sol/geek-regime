import webpack from "webpack";
import merge from "webpack-merge";
import type { CallableOption } from "webpack-cli";

import coreConfig from "./mode/core";
import developmentConfig from "./mode/development";
import productionConfig from "./mode/production";

const config: CallableOption = (env, argv) => {
    let configByMode: webpack.Configuration;

    switch (argv.mode) {
        case "production":
            configByMode = productionConfig;
            break;
        case "development":
            configByMode = developmentConfig;
            break;
        default:
            configByMode = {};
    }

    return merge(coreConfig, configByMode);
};

export default config;
