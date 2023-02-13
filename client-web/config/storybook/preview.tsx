import React from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { Story, StoryContext } from "@storybook/react";

import { GlobalStyle } from "@/app/style/global";
import { theme } from "@/app/style/theme";

export const parameters = {
    actions: { argTypesRegex: "^on.*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    options: {
        storySort: {
            order: ["Shared", "*"],
        },
    },
};

type Breakpoint = keyof typeof theme.breakpoints;

const containerSizeDefaultValue: Breakpoint = "md";
const containerSizeItems: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "xxl"];

export const globalTypes = {
    containerSize: {
        name: "Container size",
        description: "Size of a story's container",
        defaultValue: containerSizeDefaultValue,
        toolbar: {
            icon: "circlehollow",
            items: containerSizeItems,
            showName: true,
        },
    },
};

export const ContainerStyled = styled.section<{ width: Breakpoint}>`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    ${({ theme: { breakpoints }, width }) => css`
        width: ${breakpoints[width] ?? breakpoints.md};
    `};
`;

export const decorators = [
    (StoryComponent: Story, context: StoryContext) => (
        <ThemeProvider theme={theme}>
            <GlobalStyle />

            <ContainerStyled width={context.globals.containerSize}>
                <StoryComponent />
            </ContainerStyled>
        </ThemeProvider>
    ),
];
