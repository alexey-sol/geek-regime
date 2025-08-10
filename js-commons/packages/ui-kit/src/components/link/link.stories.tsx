import React from "react";
import type { Meta, Story } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { Link, type LinkProps } from ".";

import { baseTheme } from "@/style/theme";

type LinkView = LinkProps["view"];

const views: LinkView[] = ["plain", "primary", "secondary"];

const getLinkTitle = (view: LinkView) => `Link (view = "${view}")`;

export default {
    title: "Link",
    component: Link,
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
        to: {
            control: "text",
        },
        view: {
            control: {
                disable: true,
            },
        },
    },
} as Meta<LinkProps>;

export const ByView: Story<LinkProps> = (arg) => (
    <MemoryRouter>
        {views.map((view) => (
            <Link
                key={view}
                view={view}
                {...arg}
            >
                {getLinkTitle(view)}
            </Link>
        ))}
    </MemoryRouter>
);
