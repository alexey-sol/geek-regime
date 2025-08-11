import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import DotenvWebpack from "dotenv-webpack";
import { type CallableOption } from "webpack-cli";
import { getRules } from "@eggziom/geek-regime-js-configs/webpack";

const cwd = process.cwd();
const publicDir = path.join(cwd, "src", "public");

const config: CallableOption = (env, argv) => ({
    resolve: {
        alias: {
            "@": path.join(cwd, "src"),
        },
    },
    plugins: [
        new DotenvWebpack({
            systemvars: true,
        }),
        new HtmlWebpackPlugin({
            template: path.join(publicDir, "index.html"),
        }),
    ],
    module: {
        rules: getRules(argv.mode),
    },
});

export default config;
