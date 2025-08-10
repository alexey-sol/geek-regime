import path from "path";

import type webpack from "webpack";
import merge from "webpack-merge";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import * as cn from "../const";

import coreConfig from "./core";

const MODE = "production";

const config: webpack.Configuration = merge(coreConfig, {
    mode: MODE,
    output: {
        filename: `${cn.JS_OUTPUT}/[name].[${cn.HASH}].js`,
        chunkFilename: `${cn.JS_OUTPUT}/[name].[${cn.HASH}].chunk.js`,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `[name].[${cn.HASH}].css`,
            chunkFilename: `[id].[${cn.HASH}].css`,
        }),
    ],
    devtool: "source-map",
    cache: false,
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    filename: path.join(cn.JS_OUTPUT, "libs", "vendor.[name].js"),
                    reuseExistingChunk: true,
                },
            },
        },
    },
});

export default config;
