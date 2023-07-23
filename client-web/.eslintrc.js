module.exports = {
    extends: [
        "./node_modules/@eggziom/geek-regime-js-configs/dist/eslint/config.react",
    ],
    overrides: [
        {
            files: ["**/*.config.*", "**/config.*", "**/features/**/*-view.*"],
            rules: {
                "import/no-default-export": "off",
            },
        },
    ],
};
