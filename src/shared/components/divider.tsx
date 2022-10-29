import React from "react";
import styled from "styled-components";

const DividerStyled = styled.hr`
    width: 100%;
    border-top: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.greyLighten};
`;

export const Divider = () => (
    <DividerStyled />
);
