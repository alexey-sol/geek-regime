import merge from "webpack-merge";
import type webpack from "webpack";

import coreConfig from "./mode/core";
import productionConfig from "./mode/production";

export const productionWebpackConfig = merge<webpack.Configuration>(coreConfig, productionConfig);
