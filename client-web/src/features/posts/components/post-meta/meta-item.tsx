import React, { type ComponentType, type FC } from "react";
import {
    type Color, type IconProps, Typography, Tooltip,
} from "@eggziom/geek-regime-js-ui-kit";

import { MetaItemStyled } from "./style";

type MetaItemProps = {
    icon: ComponentType<IconProps>;
    label: string;
    labelColor?: Color;
    tooltipMessage: string;
};

export const MetaItem: FC<MetaItemProps> = ({
    icon: Icon,
    label,
    labelColor,
    tooltipMessage,
}) => (
    <MetaItemStyled>
        <Tooltip message={tooltipMessage}>
            <Icon />
        </Tooltip>
        <Typography color={labelColor} fontSize="sm" weight="bolder">{label}</Typography>
    </MetaItemStyled>
);
