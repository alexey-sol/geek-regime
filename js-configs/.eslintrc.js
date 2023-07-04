module.exports = {
    extends: [
        "./src/eslint/config.base",
    ],
    overrides: [
        {
            files: ["src/**", "**/*.d.ts", "**/*.config.*"],
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
                    ["@", "./src"],
                ],
            },
        },
    },
};
