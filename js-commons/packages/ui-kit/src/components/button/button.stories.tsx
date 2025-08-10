import React from "react";
import type { Meta, Story } from "@storybook/react";

import { Button, type ButtonProps } from ".";

import { SearchIcon } from "@/components/icon";
import { baseTheme } from "@/style/theme";

const VIEWS: ButtonProps["view"][] = ["primary", "secondary", "plain"];

const getTitle = (view: ButtonProps["view"]) => `Button (view = "${view}")`;

export default {
    title: "Button",
    component: Button,
    argTypes: {
        children: {
            control: "text",
            description: "text",
        },
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

export const ByView: Story<ButtonProps> = ({ children, ...arg }) => (
    <>
        {VIEWS.map((view) => (
            <Button
                key={view}
                view={view}
                {...arg}
            >
                {children ?? getTitle(view)}
            </Button>
        ))}
    </>
);

export const ByViewWithIcon: Story<ButtonProps> = ({ children, ...arg }) => (
    <>
        {VIEWS.map((view) => (
            <Button
                key={view}
                icon={SearchIcon}
                view={view}
                {...arg}
            >
                {children ?? getTitle(view)}
            </Button>
        ))}
    </>
);
