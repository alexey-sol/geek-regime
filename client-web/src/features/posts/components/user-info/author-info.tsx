import React, { type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { useRelativeDateTime } from "@/shared/utils/hooks/use-relative-date-time";
import { Tooltip } from "@/shared/components/tooltip";
import { UserPicture } from "@/features/users/components/user-picture";

import { AuthorInfoStyled } from "./style";
import { UserName } from "./user-name";
import { type AuthorInfoProps } from "./types";

const PICTURE_SIZE_PX = 30;

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
            <UserPicture sizePx={PICTURE_SIZE_PX} user={author} />
            <UserName author={author} />
            &mdash;
            <Tooltip message={formattedCreatedAt}>
                <Typography as="span" color="purpleLighten" fontSize="sm">
                    {relativeCreatedAt}
                </Typography>
            </Tooltip>
        </AuthorInfoStyled>
    );
};
