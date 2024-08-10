import React from "react";
import type { Meta, Story } from "@storybook/react";

import { baseTheme } from "@/style/theme";

import { LinkButton, type LinkButtonProps } from ".";

const views: LinkButtonProps["view"][] = ["primary", "secondary"];

const getLinkButtonTitle = (view: LinkButtonProps["view"]) => `LinkButton (view = "${view}")`;

export default {
    title: "LinkButton",
    component: LinkButton,
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
        onClick: {
            action: "click",
        },
        view: {
            control: {
                disable: true,
            },
        },
    },
} as Meta<LinkButtonProps>;

export const ByView: Story<LinkButtonProps> = ({ children, ...arg }) => (
    <>
        {views.map((view) => (
            <LinkButton
                key={view}
                view={view}
                {...arg}
            >
                {children ?? getLinkButtonTitle(view)}
            </LinkButton>
        ))}
    </>
);
