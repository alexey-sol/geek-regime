module.exports = {
    extends: [
        "./node_modules/@eggziom/geek-regime-js-configs/dist/eslint/config.react",
    ],
    overrides: [
        {
            files: ["src/configs/**", "**/*.d.ts", "**/*.config.*", "**/*.stories.*"],
            rules: {
                "import/no-default-export": "off",
            },
        },
    ],
    rules: {
        "max-len": ["error", {
            code: 120,
        }],
    },
    settings: {
        "import/resolver": {
            alias: {
                map: [
                    ["@", "./src/main"],
                    ["@test", "./src/test"],
                ],
            },
        },
    },
};
