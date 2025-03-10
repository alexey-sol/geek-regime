import React, { type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { useRelativeDateTime } from "@/shared/utils/hooks/use-relative-date-time";
import { Tooltip } from "@/shared/components/tooltip";

import { UserInfoStyled } from "./style";
import { UserName } from "./user-name";
import { type UserInfoProps } from "./types";

export const UserInfo: FC<UserInfoProps> = ({
    author,
    createdAt,
    formattedCreatedAt,
}) => {
    const {
        formattedTimestamp: relativeCreatedAt,
    } = useRelativeDateTime({ timestamp: createdAt });

    return (
        <UserInfoStyled>
            <UserName author={author} />
            &mdash;
            <Tooltip message={formattedCreatedAt}>
                <Typography as="span" color="greyDark" fontSize="sm">
                    {relativeCreatedAt}
                </Typography>
            </Tooltip>
        </UserInfoStyled>
    );
};
