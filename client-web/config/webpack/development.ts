import path from "path";

import { merge } from "webpack-merge";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

import coreConfig from "./core";
import { env } from "./utils/env";
import { getStyleRule } from "./utils/rules";

const cwd = process.cwd();

interface DevelopmentConfiguration extends webpack.Configuration {
    devServer?: DevServerConfiguration;
}

const config: DevelopmentConfiguration = merge(coreConfig, {
    mode: "development",
    output: {
        publicPath: "/",
    },
    module: {
        rules: [
            getStyleRule({ mode: "development", modules: true }),
            getStyleRule({ mode: "development", modules: false }),
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
            typescript: {
                configFile: "tsconfig.json",
            },
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
    devtool: "inline-source-map",
    devServer: {
        client: {
            webSocketURL: env.webSocketUrl, // [1]
        },
        compress: true,
        devMiddleware: {
            writeToDisk: false,
        },
        historyApiFallback: true, // [2]
        host: env.clientHost,
        hot: true,
        port: env.clientPort,
        proxy: {
            [`/${env.apiPrefix}`]: env.apiUrl,
        },
        static: {
            directory: path.join(cwd, "src", "public"),
        },
    },
});

export default config;

// [1]. Makes HMR work in dockerized app.
// [2]. Serve index.html on an arbitrary path in address bar (fixes "cannot GET /...").
