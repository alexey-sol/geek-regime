import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Get absolute path to the directory containing the currently executing JavaScript file. It's cross-platform
 * since the library gets built as CJS and ESM both.
 */
export const getDirName = (): string => {
    try {
        return __dirname;
    } catch (error) {
        return dirname(fileURLToPath(import.meta.url));
    }
};
