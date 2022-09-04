import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from "dotenv-webpack";

const config: webpack.Configuration = {
    target: "web",
    entry: {
        app: path.join(__dirname, "src", "index.tsx"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            "@": path.join(__dirname, "src"),
        },
        extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    plugins: [
        new Dotenv({
            systemvars: true,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "public", "index.html"),
        }),
    ],
};

export default config;
