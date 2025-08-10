import React from "react";
import type { Meta, Story } from "@storybook/react";

import { Typography, type TypographyProps } from ".";

import { baseTheme } from "@/style/theme";
import { TYPOGRAPHY_TAG_NAMES } from "@/const";

export default {
    title: "Typography",
    component: Typography,
    argTypes: {
        as: {
            control: "select",
            options: TYPOGRAPHY_TAG_NAMES,
        },
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
