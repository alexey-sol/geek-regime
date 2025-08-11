import React, { type ComponentType, type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import { Tooltip } from "@eggziom/geek-regime-js-ui-kit/components/tooltip";
import { type IconProps } from "@eggziom/geek-regime-js-ui-kit/components/icon";
import { type Color } from "@eggziom/geek-regime-js-ui-kit/types";

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
