import { merge } from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import sharedConfig from "./shared.config";

/** Deprecated. Use Vite instead to build the library. */
export default merge(sharedConfig({}, { mode: "production" }), {
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});
