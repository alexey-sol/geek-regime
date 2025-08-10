import { type StorybookConfig } from "@storybook/react-vite";

export const baseStorybookConfig = (rootDir: string): StorybookConfig => ({
    stories: [
        `${rootDir}/src/**/*.mdx`, `${rootDir}/src/**/*.stories.@(ts|tsx)`,
    ],
    addons: [
        "@storybook/addon-a11y",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
        {
            name: "@storybook/addon-storysource",
            options: {
                include: `${rootDir}/src`,
                loaderOptions: {
                    parser: "typescript",
                },
            },
        },
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    typescript: {
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            shouldExtractValuesFromUnion: true,
            compilerOptions: {
                allowSyntheticDefaultImports: false,
                esModuleInterop: false,
            },
            propFilter: (prop) => ((prop.parent) ? !/node_modules/.test(prop.parent.fileName) : true),
        },
    },
});

// Didn't specify the path to Vite config because it should be picked up automatically by Storybook.
// Just need to put a "vite.config" file adjacent to the Storybook directory in the application.
