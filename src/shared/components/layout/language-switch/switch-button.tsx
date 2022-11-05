import React from "react";
import { Button, ButtonProps } from "@/shared/components/button";
import styled from "styled-components";

const paddingX = "0.5rem";

export const SwitchButtonStyled = styled(Button)`
    height: 100%;
    padding-right: ${paddingX};
    padding-left: ${paddingX};
    border-radius: 0;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const SwitchButton = (props: Omit<ButtonProps, "variation">) => (
    <SwitchButtonStyled
        size="smaller"
        isStretched
        variation="secondary"
        {...props}
    />
);
