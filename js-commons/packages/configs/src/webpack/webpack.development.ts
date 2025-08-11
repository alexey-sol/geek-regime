import merge from "webpack-merge";
import type webpack from "webpack";

import coreConfig from "./mode/core";
import developmentConfig from "./mode/development";

export const developmentWebpackConfig = merge<webpack.Configuration>(coreConfig, developmentConfig);
