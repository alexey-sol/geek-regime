import path from "path";

import webpack from "webpack";
import merge from "webpack-merge";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

import * as cn from "../const";

import coreConfig from "./core";

const MODE = "development";
const WEBSOCKET_URL = "auto://0.0.0.0:0/ws";
const DEV_SERVER_HOST = "localhost";
const DEV_SERVER_PORT = 3000;
const DEV_SERVER_PROXY_API = "http://localhost:3090";

const cwd = process.cwd();

interface DevelopmentConfiguration extends webpack.Configuration {
    devServer?: DevServerConfiguration;
}

const config: DevelopmentConfiguration = merge(coreConfig, {
    mode: MODE,
    output: {
        filename: `${cn.JS_OUTPUT}/bundle.js`,
        chunkFilename: `${cn.JS_OUTPUT}/[name].chunk.js`,
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
            typescript: {
                configFile: "tsconfig.json",
                context: cwd,
                diagnosticOptions: {
                    declaration: true,
                    semantic: true,
                    syntactic: true,
                },
                mode: "write-references",
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
            webSocketURL: WEBSOCKET_URL, // [1]
        },
        compress: true,
        devMiddleware: {
            writeToDisk: false,
        },
        historyApiFallback: true, // [2]
        host: DEV_SERVER_HOST,
        hot: true,
        port: DEV_SERVER_PORT,
        proxy: {
            "/api": DEV_SERVER_PROXY_API,
        },
        static: {
            directory: path.join(cwd, "src", "public"),
        },
    },
});

export default config;

// [1]. Makes HMR work in dockerized app.
// [2]. Serve index.html on an arbitrary path in address bar (fixes "cannot GET /...").
