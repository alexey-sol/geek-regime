module.exports = {
    extends: ["./node_modules/@eggziom/geek-regime-js-configs/dist/cjs/eslint/eslint.base"],
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/consistent-type-imports": "off", // [1]
    },
    ignorePatterns: [
        "node_modules/*",
        "coverage/*",
        "dist/*",
        "src/generated/*",
    ],
};

// [1]. This rule breaks NestJS' dependency injection since it enforces importing dependencies as types.
