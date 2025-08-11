import path from "path";

import { merge } from "webpack-merge";
import { type CallableOption } from "webpack-cli";
import { developmentWebpackConfig } from "@eggziom/geek-regime-js-configs/webpack";

import baseWebpackConfig from "./webpack.base";
import { env as envCf } from "./env";

const cwd = process.cwd();

const config: CallableOption = (env, argv) => {
    const baseDevelopmentConfig = merge(baseWebpackConfig(env, argv), developmentWebpackConfig);

    return merge(baseDevelopmentConfig, {
        devServer: {
            client: {
                webSocketURL: envCf.stub.webSocketUrl,
            },
            compress: true,
            devMiddleware: {
                writeToDisk: false,
            },
            historyApiFallback: true,
            host: envCf.stub.host,
            port: envCf.stub.port,
            hot: true,
            proxy: {
                "/api": envCf.stub.apiUrl,
            },
            static: {
                directory: path.join(cwd, "src", "public"),
            },
        },
    });
};

export default config;
