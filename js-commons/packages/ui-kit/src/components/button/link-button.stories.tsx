import React from "react";
import type { Meta, Story } from "@storybook/react";

import { LinkButton, type LinkButtonProps } from ".";

import { baseTheme } from "@/style/theme";
import { TYPOGRAPHY_TAG_NAMES } from "@/const";

const VIEWS: LinkButtonProps["view"][] = ["plain", "primary", "secondary"];

const getTitle = (view: LinkButtonProps["view"]) => `LinkButton (view = "${view}")`;

export default {
    title: "LinkButton",
    component: LinkButton,
    argTypes: {
        as: {
            control: "select",
            options: TYPOGRAPHY_TAG_NAMES,
        },
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
        {VIEWS.map((view) => (
            <LinkButton
                key={view}
                view={view}
                {...arg}
            >
                {children ?? getTitle(view)}
            </LinkButton>
        ))}
    </>
);
