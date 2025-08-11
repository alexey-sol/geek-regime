import { dirname } from "path";
import { fileURLToPath } from "url";

// FIXME
// Чтобы использовать import/export злдесь, нужно указать type: module в package.json. А в этом пакете
// я не могу его указать, тк тогда он будет перебивать type из dist/.../package.json (cjs/esm)

/**
 * Get absolute path to the directory containing the currently executing JavaScript file.
 */
export const getDirName = (): string => {
    try {
        return __dirname;
    } catch (error) {
        return dirname(fileURLToPath(import.meta.url));
    }
};
