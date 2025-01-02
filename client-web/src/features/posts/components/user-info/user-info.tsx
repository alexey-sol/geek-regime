import React, { type FC } from "react";
import { Link, Typography } from "@eggziom/geek-regime-js-ui-kit";

import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { useRelativeDateTime } from "@/shared/utils/hooks/use-relative-date-time";
import { Tooltip } from "@/shared/components/tooltip";
import { User } from "@/features/users/models/entities";

import { UserInfoStyled } from "./style";

type UserInfoProps = {
    author: User;
    createdAt: string;
    formattedCreatedAt: string;
};

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
            <Link
                data-testid="post-overview/author-slug-link"
                to={createAbsoluteUsersPath(author.slug)}
            >
                {author.details.name}
            </Link>
            &mdash;
            <Tooltip message={formattedCreatedAt}>
                <Typography as="span" color="greyDark" fontSize="sm">
                    {relativeCreatedAt}
                </Typography>
            </Tooltip>
        </UserInfoStyled>
    );
};
