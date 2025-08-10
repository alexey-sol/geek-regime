import type webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import * as cn from "../const";
import babelWebpackConfig from "../../babel/babel.webpack";

type Mode = webpack.Configuration["mode"];

const getBabelLoaderRule = () => ({
    test: /\.tsx?$/,
    loader: "babel-loader",
    exclude: [/node_modules/, /json/],
    options: babelWebpackConfig,
});

const getStyleLoader = (isProduction: boolean): webpack.RuleSetUseItem =>
    (isProduction ? MiniCssExtractPlugin.loader : "style-loader");

const getCssLoader = (isProduction: boolean, modules: boolean): webpack.RuleSetUseItem => ({
    loader: "css-loader",
    options: {
        importLoaders: 1,
        modules: modules
            ? { localIdentName: "[name]__[local]__[hash:base64:5]" }
            : undefined,
        sourceMap: !isProduction,
    },
});

const getPostCssLoader = (isProduction: boolean): webpack.RuleSetUseItem => ({
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            plugins: ["postcss-preset-env"],
        },
        sourceMap: !isProduction,
    },
});

const getSassLoader = (isProduction: boolean): webpack.RuleSetUseItem => ({
    loader: "sass-loader",
    options: {
        sourceMap: !isProduction,
    },
});

const MODULE_PREFIXED_EXT = /\.module.(css|s[ac]ss)$/i;
const NOT_PREFIXED_EXT = /\.(css|s[ac]ss)$/i;

export const getStyleRule = ({ mode, modules }: {
    mode: webpack.Configuration["mode"];
    modules: boolean;
}): webpack.RuleSetRule => {
    const isProduction = mode === "production";

    return {
        test: modules
            ? MODULE_PREFIXED_EXT
            : NOT_PREFIXED_EXT,
        exclude: modules
            ? undefined
            : MODULE_PREFIXED_EXT,
        use: [
            getStyleLoader(isProduction),
            getCssLoader(isProduction, modules),
            getPostCssLoader(isProduction),
            getSassLoader(isProduction),
        ],
    };
};

// Using it instead of file-loader which isn't longer needed in Webpack 5.
export const getMediaRule = () => ({
    test: /\.(png|jpe?g|gif)$/i,
    type: "asset/resource",
    generator: {
        filename: `${cn.MEDIA_OUTPUT}/[name][ext]`,
    },
} as const);

export const getRules = (mode: Mode): webpack.RuleSetRule[] => ([
    getBabelLoaderRule(),
    getStyleRule({ mode, modules: true }),
    getStyleRule({ mode, modules: false }),
    getMediaRule(),
]);
