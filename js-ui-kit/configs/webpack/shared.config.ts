import path from "path";

import nodeExternals from "webpack-node-externals";
import merge from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import configByMode, { getRules } from "@eggziom/geek-regime-js-configs/dist/webpack";
import type { CallableOption } from "webpack-cli";

const LIBRARY_TYPE = "module";

const cwd = process.cwd();

const config: CallableOption = (env, argv) => merge(configByMode(env, argv), {
    entry: path.resolve(cwd, "src", "main"),
    output: {
        clean: true,
        filename: "index.js",
        library: {
            type: LIBRARY_TYPE,
        },
        path: path.resolve(cwd, "dist", "main"),
        publicPath: "./",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "global.css",
        }),
    ],
    experiments: {
        outputModule: true,
    },
    externals: [nodeExternals()],
    resolve: {
        alias: {
            "@": path.resolve(cwd, "src", "main"),
        },
    },
    module: {
        rules: getRules(argv.mode),
    },
});

export default config;
