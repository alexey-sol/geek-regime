import webpack from "webpack";
import merge from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import productionConfig from "./production";

const config: webpack.Configuration = merge(productionConfig, {
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});

export default config;
