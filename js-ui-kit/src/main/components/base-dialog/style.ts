import styled from "styled-components";

import { Typography } from "../typography";

export type BaseDialogStyledProps = {
    width?: "auto" | "normal" | "narrow";
};

const mapWidthToCssValue: Record<NonNullable<BaseDialogStyledProps["width"]>, string> = {
    auto: "auto",
    narrow: "40rem",
    normal: "60rem",
};

export const BaseDialogStyled = styled.section<BaseDialogStyledProps>`
    display: flex;
    flex-direction: column;
    width: ${({ width = "auto" }) => mapWidthToCssValue[width]};
    padding: 3rem;
    background-color: ${({ theme }) => theme.colors.white};
    outline: none;
`;

export const HeaderStyled = styled.section`
    display: flex;
    justify-content: end;

    ${Typography} {
        flex: 1;
    }
`;

export const ControlsWrap = styled.section`
    display: flex;
    column-gap: 1rem;
`;
