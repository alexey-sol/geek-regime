import { merge } from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import webpackBuild from "./webpack.build";

export default merge(webpackBuild({}, { mode: "production" }), {
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});
