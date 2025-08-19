module.exports = {
    extends: [
        "./packages/configs/dist/cjs/eslint/eslint.react",
        "prettier",
    ],
    ignorePatterns: [
        "**/node_modules/*",
        "packages/**/coverage/*",
        "packages/**/dist/*",
        "packages/**/src/generated/*",
    ],
};
