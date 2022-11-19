import path from "path";

import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { config as dotenvConfig } from "dotenv";
import DotenvWebpack from "dotenv-webpack";

dotenvConfig({ path: ".env" });

const cwd = process.cwd();

const config: webpack.Configuration = {
    context: path.join(__dirname, "..", ".."),
    target: "web",
    entry: {
        app: path.join(cwd, "src", "index.tsx"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /json/],
                options: {
                    configFile: path.join(cwd, "config", "babel.config.js"),
                },
            },
        ],
    },
    resolve: {
        alias: {
            "@": path.join(cwd, "src"),
        },
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
    },
    plugins: [
        new DotenvWebpack({
            systemvars: true,
        }),
        new HtmlWebpackPlugin({
            template: path.join(cwd, "src", "public", "index.html"),
        }),
    ],
};

export default config;
