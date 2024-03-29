const path = require("path");

const baseConfig = path.resolve("node_modules", "@eggziom", "geek-regime-js-configs", "dist", "eslint", "config.base");

module.exports = {
    extends: [
        baseConfig,
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
                    ["@", "./src"],
                ],
            },
        },
    },
};
