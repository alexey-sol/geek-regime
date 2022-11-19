export default {
    bail: Infinity,
    clearMocks: true,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/style.{ts,tsx}",
        "!src/**/const.{ts,tsx}",
        "!**/*.d.ts",
        "!**/index.{ts,tsx}",
        "!**/node_modules/**",
    ],
    globals: {
        "ts-jest": {
            isolatedModules: true,
        },
    },
    moduleNameMapper: {
        "^@/(.*)": "<rootDir>/src/$1",
    },
    preset: "ts-jest/presets/js-with-ts",
    setupFilesAfterEnv: ["<rootDir>/src/test/setup.tsx"],
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: {
        // eslint-disable-next-line
        ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "<rootDir>/src/test/mocks/file-mock.js",
    },
    transformIgnorePatterns: [
        "node_modules/(?!(lodash-es|@popperjs)/)",
    ],
    verbose: true,
};
