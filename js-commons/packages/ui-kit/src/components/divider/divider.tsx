import React, { type FC } from "react";
import styled, { css } from "styled-components";

import { type HasClassName } from "@/types/props";

type DividerProps = Partial<HasClassName> & {
    widthPx?: number;
};

const DividerStyled = styled.hr<DividerProps>`
    width: 100%;
    border-top: none;
    ${({ theme, widthPx = 1 }) => css`
        border-bottom: ${widthPx}px solid ${theme.colors.greyLighten};
    `};
`;

export const Divider: FC<DividerProps> = ({ widthPx, ...rest }) => <DividerStyled widthPx={widthPx} {...rest} />;
