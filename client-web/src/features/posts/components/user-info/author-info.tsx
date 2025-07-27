import React, { type FC } from "react";
import { Tooltip, Typography } from "@eggziom/geek-regime-js-ui-kit";

import { useRelativeDateTime } from "@/shared/utils/hooks/use-relative-date-time";

import { AuthorInfoStyled } from "./style";
import { type AuthorInfoProps } from "./types";
import { DefunctUserName, UserName } from "./user-name";

export const AuthorInfo: FC<AuthorInfoProps> = ({
    author,
    createdAt,
    formattedCreatedAt,
}) => {
    const {
        formattedTimestamp: relativeCreatedAt,
    } = useRelativeDateTime({ timestamp: createdAt });

    return (
        <AuthorInfoStyled>
            {(author
                ? <UserName author={author} />
                : <DefunctUserName />)}
            &mdash;
            <Tooltip message={formattedCreatedAt}>
                <Typography as="span" color="purpleLighten" fontSize="sm">
                    {relativeCreatedAt}
                </Typography>
            </Tooltip>
        </AuthorInfoStyled>
    );
};
