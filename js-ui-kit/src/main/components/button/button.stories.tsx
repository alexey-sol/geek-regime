import React from "react";
import type { Meta, Story } from "@storybook/react";

import { SearchIcon } from "@/components/icon";
import { baseTheme } from "@/style/theme";

import { Button, type ButtonProps } from ".";

type ButtonView = ButtonProps["view"];

const views: ButtonView[] = ["primary", "secondary", "plain", "transparent"];

const getButtonTitle = (view: ButtonView) => `Button (view = "${view}")`;

export default {
    title: "Button",
    component: Button,
    argTypes: {
        color: {
            control: "select",
            options: Object.keys(baseTheme.colors),
        },
        disabled: {
            control: "boolean",
            defaultValue: false,
        },
        font: {
            control: "select",
            options: Object.keys(baseTheme.fonts),
        },
        fontSize: {
            control: "select",
            options: Object.keys(baseTheme.fontSizes),
        },
        isStretched: {
            control: "boolean",
            defaultValue: false,
        },
        onClick: {
            action: "click",
        },
        view: {
            control: {
                disable: true,
            },
        },
    },
} as Meta<ButtonProps>;

export const ByView: Story<ButtonProps> = (arg) => (
    <>
        {views.map((view) => (
            <Button
                key={view}
                view={view}
                {...arg}
            >
                {getButtonTitle(view)}
            </Button>
        ))}
    </>
);

export const ByViewWithIcon: Story<ButtonProps> = (arg) => (
    <>
        {views.map((view) => (
            <Button
                key={view}
                icon={SearchIcon}
                view={view}
                {...arg}
            >
                {getButtonTitle(view)}
            </Button>
        ))}
    </>
);
