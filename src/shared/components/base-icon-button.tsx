import React, { ComponentType } from "react";
import styled from "styled-components";
import { IconProps } from "@/shared/components/icon";

const sizeInPx = 20;

const IconButtonStyled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;

    svg {
        fill: ${({ theme }) => theme.colors.primary};
        transition: fill 100ms ease;
    }

    &:hover {
        svg {
            fill: ${({ theme }) => theme.colors.secondary};
        }
    }
`;

export type BaseIconButtonProps = {
    icon: ComponentType<IconProps>;
    onClick: () => void;
    title?: string;
};

export const BaseIconButton = ({
    icon: Icon,
    onClick,
    title,
}: BaseIconButtonProps) => (
    <IconButtonStyled
        onClick={onClick}
        role="button"
        title={title}
    >
        <Icon size={sizeInPx} />
    </IconButtonStyled>
);
