import reactConfig from "@eggziom/geek-regime-js-configs/dist/jest/config.react";
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    ...reactConfig,
    moduleNameMapper: {
        ...reactConfig.moduleNameMapper,
        "^@/(.*)$": "<rootDir>/src/main/$1",
        "^@test/(.*)$": "<rootDir>/src/test/$1",
    },
    rootDir: "../",
    setupFilesAfterEnv: ["<rootDir>/src/test/setup.tsx"],
};

export default config;
