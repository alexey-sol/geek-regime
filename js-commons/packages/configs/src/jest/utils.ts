import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Get absolute path to the directory containing the currently executing JavaScript file. It must be cross-
 * platform since the library is consumed by CJS and ESM clients.
 */
export const getDirName = (): string => {
    try {
        return __dirname;
    } catch (error) {
        return dirname(fileURLToPath(import.meta.url));
    }
};
