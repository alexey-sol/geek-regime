import styled from "styled-components";
import { TypographyStyled } from "@eggziom/geek-regime-js-ui-kit";

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

    ${TypographyStyled} {
        flex: 1;
    }
`;

export const ControlsWrap = styled.section`
    display: flex;
    column-gap: 1rem;
`;
