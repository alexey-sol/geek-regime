import path from "path";

import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import DotenvWebpack from "dotenv-webpack";
import { type CallableOption } from "webpack-cli";
import { baseWebpackConfig, getRules } from "@eggziom/geek-regime-js-configs/webpack";

import { env as envCf } from "./env";

const cwd = process.cwd();
const publicDir = path.join(cwd, "src", "public");

const webpackBuild: CallableOption = (env, argv) => {
    const coreConfig = merge(baseWebpackConfig(env, argv), {
        resolve: {
            alias: {
                "@": path.join(cwd, "src"),
            },
        },
        plugins: [
            new DotenvWebpack({
                systemvars: true,
            }),
            new HtmlWebpackPlugin({
                template: path.join(publicDir, "index.html"),
            }),
        ],
        module: {
            rules: getRules(argv.mode),
        },
    });

    const isDevelopment = argv.mode === "development";

    if (isDevelopment) {
        return merge(coreConfig, {
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
    }

    return merge(coreConfig, {
        optimization: {
            splitChunks: {
                chunks: "all",
                maxInitialRequests: Infinity,
                cacheGroups: {
                    formsVendor: {
                        test: /[\\/]node_modules[\\/](formik)[\\/]/,
                        filename: path.join("js", "libs", "vendor.forms.js"),
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/](?!formik)(.[a-zA-Z0-9.\-_]+)[\\/]/,
                    },
                },
            },
        },
    });
};

export default webpackBuild;
