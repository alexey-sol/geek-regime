import React, { type FC } from "react";
import { Tooltip } from "@eggziom/geek-regime-js-ui-kit/components/tooltip";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";

import { AuthorInfoStyled } from "./style";
import { type AuthorInfoProps } from "./types";
import { DefunctUserName, UserName } from "./user-name";

import { useRelativeDateTime } from "@/shared/utils/hooks/use-relative-date-time";

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
