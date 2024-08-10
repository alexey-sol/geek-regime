import React from "react";
import type { Meta, Story } from "@storybook/react";

import { baseTheme } from "@/style/theme";

import { Typography, type TypographyProps } from ".";

export default {
    title: "Typography",
    component: Typography,
    argTypes: {
        color: {
            control: "select",
            options: Object.keys(baseTheme.colors),
        },
        font: {
            control: "select",
            options: Object.keys(baseTheme.fonts),
        },
        fontSize: {
            control: "select",
            options: Object.keys(baseTheme.fontSizes),
        },
    },
} as Meta<TypographyProps>;

export const ByView: Story<TypographyProps> = (arg) => (
    <Typography {...arg}>
        Oh hi Mark
    </Typography>
);
