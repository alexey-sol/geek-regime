import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { merge } from "webpack-merge";
import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { NodeEnv } from "./src/shared/const";
import coreConfig from "./webpack.core";
import { getStyleRule } from "./webpack.utils";

const config: webpack.Configuration = merge(coreConfig, {
    mode: NodeEnv.PRODUCTION,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        publicPath: "/",
    },
    module: {
        rules: [
            getStyleRule({ mode: NodeEnv.PRODUCTION, modules: true }),
            getStyleRule({ mode: NodeEnv.PRODUCTION, modules: false }),
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
