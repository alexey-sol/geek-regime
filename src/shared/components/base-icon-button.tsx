import React, { ComponentType } from "react";
import styled, { useTheme } from "styled-components";
import { IconProps } from "@/shared/components/icon";

const IconButtonStyled = styled.section`
    cursor: pointer;
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
}: BaseIconButtonProps) => {
    const theme = useTheme();

    return (
        <IconButtonStyled
            onClick={onClick}
            role="button"
            title={title}
        >
            <Icon color={theme.colors.secondary} />
        </IconButtonStyled>
    );
};
