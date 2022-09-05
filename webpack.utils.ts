import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { NodeEnv } from "./src/shared/const";

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

const getSassLoader = (isProduction: boolean) => ({
    loader: "sass-loader",
    options: {
        sourceMap: !isProduction,
    },
});

export const getStyleRule = ({ mode, modules }: {
    mode: NodeEnv;
    modules: boolean;
}): webpack.RuleSetRule => {
    const isProduction = mode === NodeEnv.PRODUCTION;
    const moduleScssRegExp = /\.module.s[ac]ss$/i;
    const scssRegExp = /\.s[ac]ss$/i;

    return {
        test: modules
            ? moduleScssRegExp
            : scssRegExp,
        exclude: modules
            ? undefined
            : moduleScssRegExp,
        use: [
            getStyleLoader(isProduction),
            getCssLoader(isProduction, modules),
            getPostCssLoader(isProduction),
            getSassLoader(isProduction),
        ],
    };
};
