import path from "path";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { merge } from "webpack-merge";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import coreConfig from "./webpack.core";
import { getStyleRule } from "./webpack.utils";

const config: webpack.Configuration = merge(coreConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        publicPath: "/",
    },
    module: {
        rules: [
            getStyleRule({ mode: "production", modules: true }),
            getStyleRule({ mode: "production", modules: false }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css",
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
});

export default config;
