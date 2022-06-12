import webpack from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { merge } from "webpack-merge";
import path from "path";
import * as nodeEnvConst from "./src/const/node-env";
import coreConfig from "./webpack.core";
import { envConfig } from "./src/config/env";

interface ResultConfiguration extends webpack.Configuration {
    devServer?: WebpackDevServerConfiguration;
}

const config: ResultConfiguration = merge(coreConfig, {
    mode: nodeEnvConst.DEVELOPMENT,
    output: {
        publicPath: "/",
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({ async: false }),
    ],
    devtool: "inline-source-map",
    devServer: {
        client: {
            webSocketURL: envConfig.webSocketUrl, // [1]
        },
        compress: true,
        devMiddleware: {
            writeToDisk: false,
        },
        host: envConfig.clientHost,
        hot: true,
        port: envConfig.clientPort,
        proxy: {
            [`/${envConfig.apiPrefix}`]: envConfig.apiUrl,
        },
        static: {
            directory: path.join(__dirname, "./dist"),
        },
    },
});

export default config;

// [1]. Makes HMR work in dockerized app.
