import React, { type FC, useCallback } from "react";
import styled, { css } from "styled-components";

import { Typography } from "../typography";

import { useTabContext } from "./tab-context";
import * as cn from "./const";

const TabStyled = styled.li<{ isActive?: boolean }>(
    ({ theme, isActive = false }) => css`
        cursor: pointer;
        padding-bottom: 1rem;
        border-bottom: ${cn.TAB_BORDER_WIDTH} solid transparent;
        transition: border-color ${theme.durations.fast} ease;

        ${isActive
            ? css`
                  border-color: ${theme.colors.secondary};
              `
            : css`
                  &:hover {
                      border-color: ${theme.colors.grey};
                  }
              `};
    `,
);

export type TabProps = {
    label: string;
    value: string;
};

export const Tab: FC<TabProps> = ({ label, value }) => {
    const { onChange, value: activeValue } = useTabContext();

    const handleClick = useCallback(() => {
        onChange(value);
    }, [onChange, value]);

    const isActive = activeValue === value;

    return (
        <TabStyled isActive={isActive} onClick={handleClick} role="tab">
            <Typography as="h3" color={isActive ? "secondary" : "grey"}>
                {label}
            </Typography>
        </TabStyled>
    );
};
