import path from "path";

import webpack from "webpack";

import * as cn from "../const";

const cwd = process.cwd();

const config: webpack.Configuration = {
    context: cwd,
    output: {
        assetModuleFilename: `${cn.MEDIA_OUTPUT}/[name].[${cn.HASH}][ext]`,
        clean: true,
        path: path.resolve(cwd, "dist"),
    },
    target: "web",
    entry: path.resolve(cwd, "src"),
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
        modules: [cwd, "node_modules"],
    },
};

export default config;
