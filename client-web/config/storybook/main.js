module.exports = {
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-a11y",
    ],
    core: {
        builder: "webpack5",
    },
    features: {
        interactionsDebugger: true,
    },
    stories: ["../../src/**/*.stories.tsx"],
};
