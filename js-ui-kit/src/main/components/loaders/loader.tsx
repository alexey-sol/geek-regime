import styled, { css } from "styled-components";
import React, { type FC } from "react";

import { type HasClassName } from "@/types/props";

const LoaderWrapStyled = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const LoaderStyled = styled.section(
    ({ theme }) => css`
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin: 15px auto;
        background: ${theme.colors.purpleLighten};
        box-shadow: -24px 0 ${theme.colors.purpleLighten}, 24px 0 ${theme.colors.purpleLighten};
        animation: loading 2s linear infinite;

        @keyframes loading {
            33% {
                background: ${theme.colors.purpleLighten};
                box-shadow: -24px 0 ${theme.colors.orange}, 24px 0 ${theme.colors.purpleLighten};
            }

            66% {
                background: ${theme.colors.orange};
                box-shadow: -24px 0 ${theme.colors.purpleLighten}, 24px 0 ${theme.colors.purpleLighten};
            }

            100% {
                background: ${theme.colors.purpleLighten};
                box-shadow: -24px 0 ${theme.colors.purpleLighten}, 24px 0 ${theme.colors.orange};
            }
        }
    `,
);

export const Loader: FC<Partial<HasClassName>> = ({ className }) => (
    <LoaderWrapStyled className={className}>
        <LoaderStyled />
    </LoaderWrapStyled>
);
