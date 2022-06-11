import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { merge } from "webpack-merge";
import path from "path";
import webpack from "webpack";
import * as nodeEnvConst from "@/const/node-env";
import coreConfig from "./webpack.core";

const config: webpack.Configuration = merge(coreConfig, {
    mode: nodeEnvConst.PRODUCTION,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        publicPath: "/",
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
});

export default config;
