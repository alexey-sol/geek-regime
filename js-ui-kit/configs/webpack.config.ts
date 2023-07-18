import path from "path";

import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import merge from "webpack-merge";
import configByMode, { getRules } from "@eggziom/geek-regime-js-configs/dist/webpack";

const LIBRARY_TYPE = "commonjs2";

const cwd = process.cwd();

const config: (env: Record<string, unknown>, argv: {
    mode: webpack.Configuration["mode"];
}) => webpack.Configuration = (env, argv) => merge(configByMode(env, argv), {
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
