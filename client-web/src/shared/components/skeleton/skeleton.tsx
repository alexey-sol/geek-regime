import React, { type FC, type PropsWithChildren } from "react";
import styled, { css } from "styled-components";

type SkeletonStyledProps = {
    heightPx?: number;
    widthPx?: number;
};

const SkeletonStyled = styled.section<SkeletonStyledProps>`
    ${({ theme, heightPx, widthPx }) => css`
        height: ${heightPx ? `${heightPx}px` : theme.fontSizes.md};
        width: ${widthPx ? `${widthPx}px` : "100%"};
        background-color: ${theme.colors.greyLighten};
    `};

    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
        );
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        animation: loading 1s infinite;
    }

    @keyframes loading {
        0% {
            transform: skewX(-10deg) translateX(-100%);
        }
        100% {
            transform: skewX(-10deg) translateX(200%);
        }
    }
`;

type SkeletonProps = SkeletonStyledProps & {
    isLoading?: boolean;
};

export const Skeleton: FC<PropsWithChildren<SkeletonProps>> = ({
    children,
    heightPx,
    isLoading = false,
    widthPx,
}) => (isLoading
    ? <SkeletonStyled heightPx={heightPx} widthPx={widthPx} />
    : <>{children}</>);
