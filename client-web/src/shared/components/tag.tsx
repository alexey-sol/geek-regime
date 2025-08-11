import React, { type FC, type MouseEventHandler, type PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { Typography, type TypographyProps } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import { CloseIconButton } from "@eggziom/geek-regime-js-ui-kit/components/icon-button";
import { type HasClassName, type HasColor } from "@eggziom/geek-regime-js-ui-kit/types";

type TagStyledProps = Partial<HasColor> & {
    isClickable?: boolean;
};

export const TagStyled = styled.section<TagStyledProps>`
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: fit-content;
    height: fit-content;
    padding: 0.3rem 1rem;
    border-radius: 1rem;
    word-break: break-word;
    transition: background-color ${({ theme }) => theme.durations.fast} ease;
    user-select: none;

    ${({ theme, color }) => color && css`
        background-color: ${theme.colors[color]};
    `};

    ${({ isClickable }) => isClickable && css`
        cursor: pointer;
    `};
`;

export type TagProps = PropsWithChildren<Pick<TypographyProps, "fontSize">>
    & Partial<HasColor>
    & Partial<HasClassName>
    & {
        onClick?: MouseEventHandler;
        onClose?: MouseEventHandler;
    };

export const Tag: FC<TagProps> = ({
    children, className, color, onClick, onClose,
}) => {
    const isClickable = !!onClick;

    return (
        <TagStyled className={className} color={color} isClickable={isClickable} onClick={onClick}>
            <Typography as="span" fontSize="sm">{children}</Typography>
            {onClose && (
                <CloseIconButton fontSize="xxs" onClick={onClose} />
            )}
        </TagStyled>
    );
};
