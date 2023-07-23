import { merge } from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import sharedConfig from "./shared.config";

export default merge(sharedConfig({}, { mode: "production" }), {
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});
