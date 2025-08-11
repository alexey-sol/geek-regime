module.exports = {
    extends: [
        "./node_modules/@eggziom/geek-regime-js-configs/dist/cjs/eslint/eslint.react",
    ],
    ignorePatterns: [
        "node_modules/*",
        "coverage/*",
        "dist/*",
        "src/generated/*",
    ],
};
