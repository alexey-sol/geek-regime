import * as esbuild from "esbuild";

import { baseEsbuildOptions } from "./utils.mjs";

await esbuild.build({
    ...baseEsbuildOptions,
    format: "cjs",
    outdir: "dist/cjs",
});
