import React from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { type Story, type StoryContext } from "@storybook/react";
import { baseStorybookPreview } from "@eggziom/geek-regime-js-configs/storybook";

import { baseTheme } from "../../src/style";

import { GlobalStyle } from "@/style/global";

export const { parameters } = baseStorybookPreview;

type Breakpoint = keyof typeof baseTheme.breakpoints;

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

export const ContainerStyled = styled.section<{ width: Breakpoint }>`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    ${({ theme: { breakpoints }, width }) => css`
        width: ${breakpoints[width] ?? breakpoints.md};
    `};
`;

export const decorators = [
    (StoryComponent: Story, context: StoryContext): JSX.Element => (
        <ThemeProvider theme={baseTheme}>
            <GlobalStyle />

            <ContainerStyled width={context.globals.containerSize}>
                <StoryComponent />
            </ContainerStyled>
        </ThemeProvider>
    ),
];
