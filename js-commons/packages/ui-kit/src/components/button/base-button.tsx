import styled, { css } from "styled-components";
import { type ButtonHTMLAttributes } from "react";

import { type TypographyProps } from "@/components/typography";

export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    Pick<TypographyProps, "color" | "fontSize" | "font">;

export const BaseButton = styled.button<BaseButtonProps>(
    ({ theme }) => css`
        border: none;
        user-select: none;
        cursor: pointer;

        &:hover {
            transition:
                border-color ${theme.durations.normal} ease,
                background-color ${theme.durations.normal} ease,
                color ${theme.durations.normal} ease,
                fill ${theme.durations.normal} ease,
                opacity ${theme.durations.normal} ease;
        }

        &:disabled {
            opacity: 0.8;
            cursor: default;
        }
    `,
);
