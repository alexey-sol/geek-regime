import { type Preview } from "@storybook/react";

export const baseStorybookPreview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on.*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};
