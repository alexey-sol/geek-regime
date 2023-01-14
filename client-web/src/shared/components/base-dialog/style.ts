import styled from "styled-components";

import { TypographyStyled } from "../typography/style";

export type BaseDialogStyledProps = {
    width?: "auto";
};

const mapWidthToCssValue: Record<NonNullable<BaseDialogStyledProps["width"]>, string> = {
    auto: "auto",
};

export const BaseDialogStyled = styled.section<BaseDialogStyledProps>`
    display: flex;
    flex-direction: column;
    min-width: ${({ width = "auto" }) => mapWidthToCssValue[width]};
    max-width: 100%;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.white};
    outline: none;
`;

export const HeaderStyled = styled.section`
    display: flex;
    justify-content: end;

    ${TypographyStyled} {
        flex: 1;
    }
`;
