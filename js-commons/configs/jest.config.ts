import baseConfig from "@eggziom/geek-regime-js-configs/dist/jest/config.base";
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    ...baseConfig,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    rootDir: "../",
};

export default config;
