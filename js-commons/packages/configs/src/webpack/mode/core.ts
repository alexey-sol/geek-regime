import path from "path";

import type webpack from "webpack";

import * as cn from "../const";

const cwd = process.cwd();

const config: webpack.Configuration = {
    context: cwd,
    output: {
        assetModuleFilename: `${cn.MEDIA_OUTPUT}/[name].[${cn.HASH}][ext]`,
        clean: true,
        path: path.resolve(cwd, "dist"),
        publicPath: "/", // [1]
    },
    target: "web",
    entry: path.resolve(cwd, "src"),
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
        modules: [cwd, "node_modules"],
    },
};

export default config;

// [1]. Without that in place, the browser may attempt to load a resource from nested path
// like "/posts/js/bundle.js" instead of "/js/bundle.js" (which is the actual location).
