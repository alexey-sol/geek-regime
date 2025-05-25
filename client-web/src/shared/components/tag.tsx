import React, { type FC, type MouseEventHandler, type PropsWithChildren } from "react";
import styled from "styled-components";
import { type HasColor, Typography, type TypographyProps } from "@eggziom/geek-regime-js-ui-kit";

import { CloseIconButton } from "@/shared/components/icon-button";

export const TagStyled = styled.section<HasColor>`
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: fit-content;
    height: fit-content;
    padding: 0.3rem 1rem;
    background-color: ${({ theme, color }) => theme.colors[color]};
    border-radius: 1rem;
    text-wrap: nowrap;
`;

export type TagProps = PropsWithChildren<Pick<TypographyProps, "fontSize">> & HasColor & {
    onClose?: MouseEventHandler;
};

export const Tag: FC<TagProps> = ({ children, color, onClose }) => (
    <TagStyled color={color}>
        <Typography as="span" fontSize="sm">{children}</Typography>
        {onClose && (
            <CloseIconButton disabled fontSize="xxs" onClick={onClose} />
        )}
    </TagStyled>
);
