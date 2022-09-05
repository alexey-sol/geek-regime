import webpack from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { merge } from "webpack-merge";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { NodeEnv } from "./src/shared/const";
import coreConfig from "./webpack.core";
import { envConfig } from "./src/config/env";
import { getStyleRule } from "./webpack.utils";

interface ResultConfiguration extends webpack.Configuration {
    devServer?: WebpackDevServerConfiguration;
}

const config: ResultConfiguration = merge(coreConfig, {
    mode: NodeEnv.DEVELOPMENT,
    output: {
        publicPath: "/",
    },
    module: {
        rules: [
            getStyleRule({ mode: NodeEnv.DEVELOPMENT, modules: true }),
            getStyleRule({ mode: NodeEnv.DEVELOPMENT, modules: false }),
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({ async: false }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
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
        historyApiFallback: true, // [2]
        host: envConfig.clientHost,
        hot: true,
        port: envConfig.clientPort,
        proxy: {
            [`/${envConfig.apiPrefix}`]: envConfig.apiUrl,
        },
        static: {
            directory: path.join(__dirname, "src", "public"),
        },
    },
});

export default config;

// [1]. Makes HMR work in dockerized app.
// [2]. Serve index.html on an arbitrary path in address bar (fixes "cannot GET /...").
