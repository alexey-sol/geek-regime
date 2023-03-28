import React, { type FC, useCallback } from "react";
import styled, { css } from "styled-components";

import { Typography } from "@/shared/components/typography";
import { useTabContext } from "@/shared/components/tabs/tab-context";

import * as cn from "./const";

const TabStyled = styled.li<{ isActive?: boolean }>`
    cursor: pointer;

    ${({ isActive = false }) => isActive && css`
        border-bottom: ${cn.TAB_BORDER_WIDTH} solid red;
    `};
`;

export type TabProps = {
    label: string;
    value: string;
};

export const Tab: FC<TabProps> = ({ label, value }) => {
    const {
        onChange,
        value: activeValue,
    } = useTabContext();

    const handleClick = useCallback(() => {
        onChange(value);
    }, [onChange, value]);

    return (
        <TabStyled
            isActive={activeValue === value}
            onClick={handleClick}
            role="tab"
        >
            <Typography>{label}</Typography>
        </TabStyled>
    );
};
