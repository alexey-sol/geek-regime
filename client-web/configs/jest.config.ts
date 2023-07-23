import reactConfig from "@eggziom/geek-regime-js-configs/dist/jest/config.react";
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    ...reactConfig,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    rootDir: "../",
    setupFiles: ["core-js"],
    setupFilesAfterEnv: ["<rootDir>/src/test/setup.tsx"],
};

export default config;
